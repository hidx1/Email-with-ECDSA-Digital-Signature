from helper import *
import binascii
from copy import deepcopy
import math
import sys

round_constants = [
  0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
  0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
  0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
  0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
  0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
  0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008
]

rotation_offsets = [
  [  0,  1, 62, 28, 27, ],
  [ 36, 44,  6, 55, 20, ],
  [  3, 10, 43, 25, 39, ],
  [ 41, 45, 15, 21,  8, ],
  [ 18,  2, 61, 56, 14, ]
]

def keccak_f(state):
  #Turn 3D 5x5xlane into 2D 5x5
  lanes=[]
  for i in range(5):
    temp = []
    for j in range(5):
      temp.append(load64(state[8*(i+5*j):8*(i+5*j)+8]))
    lanes.append(temp)

  # ROUND
  for round_num in range(24):
    # θ
    C = []
    for x in range(5):
      xor_res = lanes[x][0] ^ lanes[x][1] ^ lanes[x][2] ^ lanes[x][3] ^ lanes[x][4]
      C.append(xor_res)

    D = []
    for x in range(5):
      xor_res = C[(x-1)%5] ^ rot64(C[(x+1)%5], 1)
      D.append(xor_res)
    
    for x in range(5):
      temp = []
      for y in range(5):
        temp.append(lanes[x][y] ^ D[x])
      lanes[x] = temp

    # ρ and π
    B = deepcopy(lanes)
    for x in range(5):
      for y in range(5):
        B[y][(2*x+3*y)%5] = rot64(lanes[x][y], rotation_offsets[y][x])
    
    # χ
    for x in range(5):
      for y in range(5):
        lanes[x][y] = B[x][y] ^ ((~B[(x+1)%5][y] & (B[(x+2)%5][y])))

    # ι
    lanes[0][0] = lanes[0][0] ^ round_constants[round_num]
  
  state = bytearray(200)
  for i in range(5):
    for j in range(5):
      state[8*(i+5*j):8*(i+5*j)+8] = store64(lanes[i][j])
  return state

def keccak(rate, capacity, msg, suffix, output_length):
  state = bytearray((rate+capacity) // 8)
  rate_in_bytes = rate // 8
  iteration = math.ceil(len(msg) / rate_in_bytes)

  # --ABSORBING--
  for i in range(iteration):
    block_size = rate_in_bytes
    if (i == iteration-1):
      block_size = len(msg) - (i * rate_in_bytes)
    
    msg_chunk = msg[i*rate_in_bytes:i*rate_in_bytes+block_size]
    for j in range(block_size):
      state[j] ^= msg_chunk[j]
    
    if (block_size == rate_in_bytes):
      state = keccak_f(state)
      block_size = 0

  # encode trailing bits
  state[block_size] = state[block_size] ^ suffix
  state[rate_in_bytes-1] = state[rate_in_bytes-1] ^ 0x80

  # last absorb round
  state = keccak_f(state)

  # --SQUEEZING--
  result = bytearray()
  output_length_in_bytes = output_length // 8

  iteration = math.ceil(output_length_in_bytes / rate_in_bytes)
  for i in range(iteration):
    block_size = rate_in_bytes
    if (i == iteration-1):
      block_size = output_length_in_bytes - (i * rate_in_bytes)
    result += state[0:block_size]
    remainder = output_length_in_bytes - (i * output_length_in_bytes)
    if (remainder > 0):
      state = keccak_f(state)

  return result

def sha3(message, rate=1088, capacity=512):
  msg = bytearray(message, "cp1252")
  suffix = 0x06
  is_sha3 = True
  if (rate == 1152 and capacity == 448): #SHA3-224
    output_length = 224
  elif (rate == 1088 and capacity == 512): #SHA3-256
    output_length = 256
  elif (rate == 832 and capacity == 768): #SHA3-384
    output_length = 384
  elif (rate == 576 and capacity == 1024): #SHA3-512
    output_length = 512
  else:
    is_sha3 = False
  
  if (is_sha3):
    return keccak(rate, capacity, msg, suffix, output_length)
  else:
    return "wrong rate and capacity value"

if __name__ == "__main__":
  input_string = sys.argv[1]
  result = sha3(input_string)
  print(result)
  # result = binascii.hexlify(result).upper()
  # result = result.decode("cp1252")
  # print(result)