from helper import *

def sha3(message, d=512, r=576, c=1024):
  msg = convert_string_to_binary(message) 
  msg = add_padding(msg, r)
  msg = create_blocks(msg, r)
  state_r = '0' * r
  state_c = '0' * c
  
  #absorbing
  for block in msg:
    state_r, state_c = absorb(block, state_r, state_c)
  
  #squeezing
  Z = ""
  while (len(Z) < d):
    Z += state_r
    if (len(Z) < d):
      state_r, state_c = f_func(state_r, state_c)
  
  result = Z[0:d]

  return result

def absorb(message, state_r, state_c):
  xor_result = xor_binary(message, state_r)
  result_r, result_c = f_func(xor_result, state_c)
  
  return result_r, result_c

def f_func(xor_result, state_c):
  #TBD
  return xor_result, state_c

if __name__ == "__main__":
  result = sha3("Ini string buat test keccak. Untuk sekarang f function belum selesai.")
  print(f"result: {result}")