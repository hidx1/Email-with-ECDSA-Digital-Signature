from Crypto.Util import number

import math
import random
import base64
import time

def is_prime(num):
    prime = True
    if (num > 1):
        for i in range(2, int(math.sqrt(num)) + 1):
            if (num % i) == 0:
                prime = False
                break
    else:
        prime = False

    return prime

def is_coprime(a, b):
    return math.gcd(a, b) == 1

def modulo_multiplication(a, b, n):
    res = 0
    a = a % n

    while (b):
        if (b & 1):
            res = (res + a) % n

        a = (2 * a) % n
        b >>= 1

    return res

def gcd(a, b):
    while (b):
        a, b = b, a % b
    return a

def find_ref_num(n):
    bit_num = n.bit_length()
    n_div = bit_num // 8
    n_mod = bit_num % 8

    ref_num = n_div if n_mod == 0 else (n_div + 1)
    return ref_num

def pkcs7_padding(init_byte, block_size):
    result = init_byte
    padded_count = block_size - (len(init_byte) % block_size)
    if padded_count == 0:
        padded_count = block_size
    padded_byte = bytes([padded_count])
    for i in range(padded_count):
        result += padded_byte
    return result

def pkcs7_depadding(init_byte, block_size):
    padded_count = int.from_bytes(init_byte[-1:], byteorder='big')
    return init_byte[:-padded_count]

def read_public_file(filename):
    public_file = open(filename, "r")
    e_var = public_file.readline()
    n_var = public_file.readline()
    public_file.close()

    return e_var, n_var

def read_private_file(filename):
    private_file = open(filename, "r")
    d_var = private_file.readline()
    n_var = private_file.readline()
    private_file.close()

    return d_var, n_var

def generate_key(self):
    key_size = 512
    p = number.getPrime(key_size)
    q = number.getPrime(key_size)
    n = p * q
    tot = (p - 1) * (q - 1)
    min_range = max(1, int(round(1/2 * key_size)))
    min_range = min(16, min_range)
    while True:
        e = random.randrange((2 ** min_range) + 1,
                                2 ** (min_range + 1))
        if (gcd(e, tot) == 1):
            break
    if (p == q):
        return 0, 'P and Q has to be different number'
    if not is_coprime(e, tot):
        return 0, 'E and Tot has to be coprime'

    public_key = [str(e), str(n)]

    k = 1
    is_int = False
    while (not is_int):
        if (modulo_multiplication(k, tot, e) == e - 1):
            d = (1 + k * tot) // e
            is_int = True
        else:
            k += 1

    private_key = [str(int(d)), str(n)]

    f_pub = open("public.pub", "w")
    f_pri = open("private.pri", "w")

    f_pub.write(public_key[0])
    f_pub.write("\n")
    f_pub.write(public_key[1])
    f_pri.write(private_key[0])
    f_pri.write("\n")
    f_pri.write(private_key[1])

    f_pub.close()
    f_pri.close()

    return e, n, d

def encrypt(initial_raw):
    d, n = read_private_file("private.pri")
    d = int(d)
    n = int(n)

    ref_num = find_ref_num(n)
    if ref_num == 1:
        return 0, "Error: Key should be at least more than 1 byte"

    else:
        encrypt_start = time.time()
        bytes_init = initial_raw.encode('utf-8')
        bytes_init = pkcs7_padding(bytes_init, (ref_num - 1))
        bytes_target = bytearray()

        for i in range(0, len(bytes_init), (ref_num - 1)):
            byte_init = int.from_bytes(
                bytes_init[i:i+(ref_num - 1)], byteorder='big')
            byte_target = pow(byte_init, d, n)
            byte_target = byte_target.to_bytes(ref_num, 'big')
            bytes_target += byte_target

        bytes_target = bytes(bytes_target)
        bytes_target = base64.b64encode(bytes_target)
        bytes_target = bytes_target.decode('utf-8')

        encrpyt_end = time.time()
        encrypt_time = encrpyt_end - encrypt_start

        return 1, bytes_target

def decrypt(initial_raw):
    e, n = read_public_file("public.pub")
    e = int(e)
    n = int(n)

    ref_num = find_ref_num(n)
    if ref_num == 1:
        return 0, "Error: Key should be at least more than 1 byte"

    encrypt_start = time.time()
    bytes_init = initial_raw.encode('utf-8')
    bytes_init = base64.b64decode(bytes_init)
    bytes_target = bytearray()
    for i in range(0, len(bytes_init), ref_num):
        byte_init = int.from_bytes(
            bytes_init[i:i+ref_num], byteorder='big')
        byte_target = pow(byte_init, e, n)
        target_byte = byte_target.to_bytes(ref_num, 'big')
        bytes_target += target_byte[1:ref_num]
    bytes_target = pkcs7_depadding(bytes_target, ref_num - 1)
    str_target = bytes_target.decode('utf-8')

    encrpyt_end = time.time()
    encrypt_time = encrpyt_end - encrypt_start

    return 1, bytes_target
