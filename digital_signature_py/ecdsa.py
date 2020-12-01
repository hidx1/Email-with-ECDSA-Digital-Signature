from operation import *
from curve import Curve
import random
from sha3 import *
from point import Point

def generateKey():
    curve = Curve()
    d = random.randint(1, curve.n-1)
    Q = multiply(curve.G, d)

    privateKey = d
    publicKey = Q

    return publicKey, privateKey

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
    signature = "--BEGIN SIGNATURE--\n" + str(hex(r)) + "\n" + str(hex(s)) + "\n--END SIGNATURE--\n"
    message = signature + message

    return message

def verify(messageEmbed, publicKey):
    curve = Curve()
    inf = float('inf')
    # Extract signature from message
    messageArr = messageEmbed.split("\n--END SIGNATURE--\n")
    message = messageArr[1]
    signature = messageArr[0].replace("--BEGIN SIGNATURE--\n", "").split("\n")
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
    sign_op = sys.argv[1] == "sign"
    message = sys.argv[2]

    if (sign_op):
        publicKey, privateKey = generateKey()
        print(publicKey.x)
        print(publicKey.y)
        print(publicKey.z)
        print(sign(message, privateKey))
    else:
        if (len(sys.argv) == 5):
            x = int(sys.argv[3])
            y = int(sys.argv[4])
            publicKey = Point(x,y,0)
            print(verify(message, publicKey))
        else:
            print("Verification need x, y, and z of public key")