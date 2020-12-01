def rot64(val, shift_num):
  INT_BITS = 64
  MAX = 1 << INT_BITS
  return ((val >> (INT_BITS-(shift_num % INT_BITS))) + (val << (shift_num % INT_BITS))) % MAX

def load64(byte_array):
  return sum((byte_array[i] << (8*i)) for i in range(8))

def store64(val):
  return list((val >> (8*i)) % 256 for i in range(8))

def inverse_mod(a, m):
  MMI = lambda A, n,s=1,t=0,N=0: (n < 2 and t%N or MMI(n, A%n, t, s-A//n*t, N or n),-1)[n<1]
  return MMI(a, m)