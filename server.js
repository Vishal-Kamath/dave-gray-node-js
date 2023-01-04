const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom Middleware logger
app.use(logger);

// CORS - Cross Origin Resource Sharing
// currently accesible by anybody this is suited for public api's where anyone can access it
// create a whitelist to ristrict access only to the urls in whitelist
const whitelist = ['https://www.youtube.com', 'http://localhost:3000', 'http://localhost:3000']; // only these can access 
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) { //inculded in white list or origin is undefined
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
// built in middleware to handle urlencoded data
// in other words, form data;
// 'content-type': 'application/x-www-form-urlencoded4
app.use(express.urlencoded({extended: false}));

// built in middleware for json
app.use(express.json());

// server static files
app.use('/',express.static(path.join(__dirname, '/public'))); // '/' request for static files comming to this will use this subdirectory it is / by default
app.use('/subdir', express.static(path.join(__dirname, '/public'))); // request comming to '/subdir will use this public folder
// makes static files available to public
// search localhost:3500/css/style.css

// router
app.use('/', require('./routes/root')); 
app.use('/subdir', require('./routes/subdir')); // routes any request coming to the subdirectory to the router 
app.use('/employees', require('./routes/api/employees')); 

// means any thing that made it hear should show 404
app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if(req.accepts('json')) {
    res.json({error: '404 not found'});
  } else {
    res.type(txt).send('404 not found');
  }
});


// ERROR handling
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server start on port ${PORT}`));