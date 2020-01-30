'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const jsf = require('json-schema-faker')

let numTestsToGenerate = process.argv[2];
let redSchemaFile = process.argv[3];
let testOutputDir = process.argv[4];

if (!fs.existsSync(testOutputDir)){
    fs.mkdirSync(testOutputDir, { recursive: true });
}

let redSchema = JSON.parse(fs.readFileSync(redSchemaFile));
let cwlSchema = {
    definitions: redSchema.definitions,
    $ref: '#/definitions/cli'
};

jsf.option({
    optionalsProbability: 0.75
})

for (var i = 0; i < numTestsToGenerate; i++) {
    let generatedData = jsf.generate(cwlSchema);
    let outputFile = util.format('test%d.cwl.json', i);
    let outputPath = path.join(testOutputDir, outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(generatedData, null, 4));
}
