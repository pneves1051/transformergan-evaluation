import glob
import os
import shutil

DIR = 'C:/Users/pedro/Documents/git/transformergan-evaluation/'
PROTO_TEST_FOLDER = 'C:/Users/pedro/Documents/git/transformergan-evaluation/tests_proto'
SAMPLES_DIR = 'C:/Users/pedro/Documents/git/transformergan-evaluation/samples/'
sample_folders = glob.glob(SAMPLES_DIR + '*')

for folder in sample_folders:
    idx =  os.path.split(folder)[-1].split('_')[-1]
    test_folder =  DIR + 'tests_' +  idx
    test_folder_samples = test_folder + '/' + os.path.split(folder)[-1]
    if not os.path.isdir(test_folder):
        shutil.copytree(PROTO_TEST_FOLDER, test_folder)
        print(folder, test_folder_samples)
        shutil.copytree(folder, test_folder_samples)

