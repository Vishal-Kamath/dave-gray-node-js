const fs = require('fs');

if (!fs.existsSync('./new')) { // if the directory does not exist then create it
  fs.mkdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
}

if (fs.existsSync('./new')) { 
  fs.rmdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory removed');
  });
}
