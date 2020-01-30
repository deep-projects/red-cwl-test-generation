# RED-CWL Test Generation

Reproducible Experiment Descriptions (RED) are build upon the Common Workflow Language (CWL) format, by embedding a subset of the standard.
When extracted from RED, the CWL subset must be compatible with CWL reference implementation cwltool.
This repostory provides tools to generate CWL files from a RED JSON-Schema, that can be validated using `cwltool --validate`.
These tools have been created to find errors in the RED JSON-Schema definition.


## Dependencies

Install packages on Fedora 30:

```bash
sudo dnf install python3-venv npm
```

Then install Node and Python dependencies

```bash
npm install
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cwltool --version
```

## Run tests

Tests in the `static_tests` directory have been created manually.

```bash
TEST_DIR=static_tests
python run-tests.py ${TEST_DIR}
```

Tests in the `generated_tests/red-9` directory have been generated from `schema/red-9.json` using the `generate-tests.js` script.

```bash
TEST_DIR=generated_tests/red-9
python run-tests.py ${TEST_DIR}
```

## Generate and run new tests

```bash
NUM_TESTS_TO_GENERATE=10
RED_SCHEMA=schema/red-9.json
TEST_DIR=user_generated_tests/red-9

node generate-tests.js ${NUM_TESTS_TO_GENERATE} ${RED_SCHEMA} ${TEST_DIR}
python run-tests.py ${TEST_DIR}
```

## Results

Using the presented test method, we found the following bugs in `schema/red-9-original.json` and applied fixes to `schema/red-9.json`.

### Bug 1

Original:

```json
{
    "cwlVersion": {
        "type": [
            "string",
            "number"
        ]
    }
}
```

Fix:

```json
{
    "cwlVersion": {
        "enum": [
            "v1.0"
        ]
    }
}
```
