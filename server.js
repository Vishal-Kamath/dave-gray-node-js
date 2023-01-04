const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Route handlers 
app.get('^/$|/index(.html)?' , (req, res) => { 
  // ^/ must begin with a slash
  // /$ must end with a slash
  //  |/index.html or it must be /index.html
  // (.html)? makes .html optional
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?' , (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?' , (req, res) => {
  res.redirect(301, '/new-page.html');  // 302 by default
                                        // 301 mean it is perminently redirected to new page 
});

// chaining route handler
// method 1
app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to call hello.html');
  next();
}, (req, res) => {
  res.send('Hello World');
});

// method 2
const one = (req, res, next) => {
  console.log('one');
  next();
} 
const two = (req, res, next) => {
  console.log('two');
  next();
} 
const three = (req, res, next) => {
  console.log('three');
  res.send('Finished');
} 

app.get('/chain(.html)?' , [one, two, three]);


// ERROR
app.get('/*', (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'views', '404.html'));
  // chianing the status code as express doesnt know its a 404 as it could find the 404.html page
});



app.listen(PORT, () => console.log(`Server start on port ${PORT}`));