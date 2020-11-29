from point import Point

def add(P, Q):
    R = Point()
    gradien = (P.y - Q.y)//(P.x - Q.x)
    R.x = gradien ** 2 - P.x - Q.x
    R.y = gradien * (P.x - R.x) - P.y

    return R

def double(P, a):
    R = Point()
    gradien = (3 * (P.x ** 2) + a)//(2 * P.y)
    R.x = gradien ** 2 - 2 * P.x
    R.y = gradien * (P.x - R.x) - P.y

    if (P.y == 0):
        R.x = None
        R.y = None
    
    return R

def multiply(P, a, k):
    if (k <= 1):
        R = P
    elif (k == 2):
        R = double(P, a)
    else:
        R = double(P, a)
        for i in range(k-2):
            R = add(R, P)
    
    return R
