const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

// Custom Middleware logger
app.use(logger);

// Middleware
// built in middleware to handle urlencoded data
// in other words, form data;
// 'content-type': 'application/x-www-form-urlencoded4
app.use(express.urlencoded({extended: false}));

// built in middleware for json
app.use(express.json());

// server static files
app.use(express.static(path.join(__dirname, '/public')));
// makes static files available to public
// search localhost:3500/css/style.css

app.get('^/$|/index(.html)?' , (req, res) => { 
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?' , (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?' , (req, res) => {
  res.redirect(301, '/new-page.html');
});

app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to call hello.html');
  next();
}, (req, res) => {
  res.send('Hello World');
});


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


app.get('/*', (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(PORT, () => console.log(`Server start on port ${PORT}`));