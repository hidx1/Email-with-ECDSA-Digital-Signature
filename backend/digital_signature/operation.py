from point import Point
from curve import Curve
from helper import *

def add(P, Q):
    curve = Curve()
    R = Point()
    inf = float('inf')

    if (P.x == inf):

        return Q

    if (Q.x == inf):

        return P

    if ((P.x - Q.x) == 0):
        R.x = inf
        R.y = inf

        return R
    gradien = ((P.y - Q.y) * inverse_mod((P.x - Q.x), curve.p)) % curve.p
    R.x = (gradien ** 2 - P.x - Q.x) % curve.p
    R.y = (gradien * (P.x - R.x) - P.y) % curve.p

    return R

def double(P):
    curve = Curve()
    inf = float('inf')
    a = curve.a
    R = Point()
    if (P.y == 0):
        R.x = inf
        R.y = inf

        return R
    gradien = ((3 * (P.x ** 2) + a) * inverse_mod(2 * P.y, curve.p)) % curve.p
    R.x = (gradien ** 2 - 2 * P.x) % curve.p
    R.y = (gradien * (P.x - R.x) - P.y) % curve.p

    return R

def multiply(P, k):
    curve = Curve()
    inf = float('inf')
    a = curve.a
    if (k == 0):
        R = Point()
        R.x = inf
        R.y = inf

        return R
    elif (k == 1):
        return P
    else:
        if (k % 2 == 0):
            # even
            return multiply(double(P), k // 2)
        else:
            # odd
            return add(P, multiply(P, k - 1))
