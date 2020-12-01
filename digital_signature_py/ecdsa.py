from operation import *
from curve import Curve
import random
from sha3 import *
from point import Point

def generateKey(d):
    curve = Curve()
    return multiply(curve.G, d)

def sign(message, privateKey):
    curve = Curve()
    r = 0
    s = 0
    while r == 0 or s == 0:
        k = random.randint(1, curve.n-1)
        R = multiply(curve.G, k)
        R.x = int(R.x)
        r = R.x % curve.n
        modResult = pow(k, -1, curve.n)
        byteMessageDigest = bytearray(sha3(message))
        e = 0
        for byte in byteMessageDigest:
            e += byte
        s = (modResult * (e + privateKey * r)) % curve.n

    # Embed signature at the beginning of message
    signature = "\n--BEGIN SIGNATURE--\n" + str(hex(r)) + "\n" + str(hex(s)) + "\n--END SIGNATURE--\n"
    message = message + signature

    return message

def appendPublic(message, publicKey):
    return message + str(publicKey.x) + "," + str(publicKey.y)

def testPublicKey(publicKey1, publicKey2):
    return publicKey1.x == publicKey2.x and publicKey1.y == publicKey2.y and publicKey1.z == publicKey2.z

def verify(messageEmbed, keyToTest):
    curve = Curve()
    inf = float('inf')
    # Extract signature from message
    # messageEmbed = messageEmbed.replace("\\n", "\n")
    messageArr = messageEmbed.split("\n--END SIGNATURE--\n")
    if (len(messageArr) < 2):
        return "Message not digitally signed"

    publicKeyString = messageArr[1].split(",")
        
    x_point = int(publicKeyString[0])
    y_point = int(publicKeyString[1])
    publicKey = Point(x_point, y_point)

    if (not testPublicKey(keyToTest, publicKey)):
        return "Private key does not match used public key"

    messageArr2 = messageArr[0].split("\n--BEGIN SIGNATURE--\n")
    signature = messageArr2[1].split("\n")
    message = messageArr2[0]
    
    r = int(signature[0], 16)
    s = int(signature[1], 16)

    if (r >= 1 and r <= curve.n-1 and s >= 1 and s <= curve.n-1):
        byteMessageDigest = bytearray(sha3(message))
        e = 0
        for byte in byteMessageDigest:
            e += byte
        w = pow(s, -1, curve.n)
        u1 = ((e % curve.n) * w) % curve.n
        u2 = ((r % curve.n) * w) % curve.n
        X = add(multiply(curve.G, u1), multiply(publicKey, u2))
        if (X.x == inf):
            return False
        X.x = int(X.x)
        v = X.x % curve.n

        return v == r

    else:
        return False

if __name__ == "__main__":
    if (len(sys.argv) < 4):
        print("Argument must be python ecdsa.py [sign/verify] [message] [private_key]")
    else:
        sign_op = sys.argv[1] == "sign"
        message = sys.argv[2]
        privateKey = bytearray(sys.argv[3], "utf-8")
        d = 0
        for byte in privateKey:
            d += byte
        
        publicKey = generateKey(d)

        if (sign_op):
            signature = sign(message, d)
            print(appendPublic(signature, publicKey))
        else:
            print(verify(message, publicKey))