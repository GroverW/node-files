const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  })
}

async function webcat(url) {
  response = await axios.get(url);
  console.log(response.data);
}

let argument = process.argv[2];

argument.search('http') !== -1 ?
  webcat(argument) :
  cat(argument); 