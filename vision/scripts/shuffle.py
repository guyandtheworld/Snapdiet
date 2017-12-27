import random
import os

random_ints = range(999, 1900)

random.shuffle(random_ints)

ROOT = ""

name = raw_input()

DIR = name+"/"

files = [name for name in os.listdir(DIR) if os.path.isfile(DIR + name)]

for i, file in enumerate(files):
    cur_dir = DIR + file
    to_move_dir = DIR + str(random_ints[i]) + ".jpg"
    print(cur_dir, to_move_dir)
    os.rename(cur_dir, to_move_dir)
