from operation import *
from curve import Curve
import random

def generateKey():
    curve = Curve()
    d = random.randint(1, curve.n-1)
    Q = multiply(curve.G, curve.a, d)

    privateKey = d
    publicKey = Q

    return publicKey, privateKey
