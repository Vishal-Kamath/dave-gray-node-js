// video 2
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

console.log('Hello....') // To show the async behavoiur of node

// exit on uncaught error 
process.on('uncaughtException', err => {
  console.log(`There was an uncaught Error: ${err}`);
  process.exit(1);
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you' , (err) => {
  if (err) throw err;
  console.log('Write complete');

  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is' , (err) => {
    if (err) throw err;
    console.log('Append complete');

    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt') , (err) => {
      if (err) throw err;
      console.log('Rename complete');
    })
  })
})