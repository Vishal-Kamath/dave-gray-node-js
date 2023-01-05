const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom Middleware logger
app.use(logger);

// CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware
app.use(express.urlencoded({extended: false}));

// built in middleware for json
app.use(express.json());

// server static files
app.use('/',express.static(path.join(__dirname, '/public'))); // '/' request for static files comming to this will use this subdirectory it is / by default

// router
app.use('/', require('./routes/root')); 
app.use('/employees', require('./routes/api/employees')); 
app.use('/register', require('./routes/api/register')); 
app.use('/auth', require('./routes/api/auth')); 

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