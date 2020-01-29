import os
import json
from subprocess import run, PIPE
from argparse import ArgumentParser

from cwltool.load_tool import resolve_and_validate_document

parser = ArgumentParser('run tests')
parser.add_argument(
    'test_input_dir',
    help='Test input directory containing CWL files in JSON format.'
)
args = parser.parse_args()

num_failed_tests = 0

for i, file_name in enumerate(os.listdir(args.test_input_dir)):
    file_path = os.path.join(args.test_input_dir, file_name)

    result = run(
        ['cwltool', '--validate', file_path],
        stdout=PIPE,
        stderr=PIPE,
        encoding='utf-8'
    )
    if result.returncode != 0:
        num_failed_tests += 1
        print(i, file_path)
        print(result.stderr)
        print(80 * '-', os.linesep)

print('Number of failed tests:', num_failed_tests, '/', i+1)