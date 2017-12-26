import os, os.path


ROOT = '../../../../FOOD'

print("Enter food name: ")

DIR = raw_input()

directory = "{}/{}".format(ROOT, DIR)
os.makedirs(directory)
i = 1

while 1:
    files = [name for name in os.listdir(ROOT) if os.path.isfile(ROOT+"/"+name)]
    if len(files) > 0:
        EXT = files[0].split(".")[1]
        print("Moving " + files[0] + "...")
        cur_dir = ROOT + "/" + files[0]
        to_move_dir = directory + "/" + str(i) + "." + EXT
        os.rename(cur_dir, to_move_dir)
        i += 1
