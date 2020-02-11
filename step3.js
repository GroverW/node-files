const fs = require('fs');
const axios = require('axios');
let readFile;
let writeFile;

if (process.argv.indexOf('--out') !== -1) {
  readFile = process.argv[4];
  writeFile = process.argv[3];
} else {
  readFile = process.argv[2];
};

function cat(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    };
    if (writeFile) {
      writeToFile(data);
    } else {
      console.log(data);
    };
  });
};

function writeToFile(content) {
  fs.appendFile(writeFile, content, "utf8", function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    };
    console.log('Successfully wrote to file!');
  });
};

async function webcat(url) {
  response = await axios.get(url);

  if (writeFile) {
    writeToFile(response.data);
  } else {
    console.log(response.data);
  };
};

process.argv.some(el => el.search('http') !== -1) ?
  webcat(readFile) :
  cat(readFile);

