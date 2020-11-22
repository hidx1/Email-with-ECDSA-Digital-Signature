import math
import numpy as np

def convert_string_to_binary(input_string):
  byte_array = bytearray(input_string, "utf8")
  
  binary_string = ""
  for byte in byte_array:
    binary_string += '{0:08b}'.format(byte)
  
  return binary_string

def add_padding(binary_string, r):
  diff = len(binary_string) - r
  padding_length = 0

  if (diff > 0):
    multiplier = math.ceil(len(binary_string) / r)
    result_length = multiplier * r
    padding_length = result_length - len(binary_string)
  else:
    padding_length = r - len(binary_string)

  padding = '0' * padding_length
  
  return padding + binary_string

def create_blocks(binary_string, block_size):
  return [binary_string[i:i+block_size] for i in range(0, len(binary_string), block_size)]

def xor_binary(binary1, binary2):
  a = int(binary1, 2)
  b = int(binary2, 2)
  result_value = a ^ b

  return '{0:0{1}b}'.format(result_value, len(binary1))