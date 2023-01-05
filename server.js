const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

// Custom Middleware logger
app.use(logger);

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware
app.use(express.urlencoded({extended: false}));

// built in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// server static files
app.use('/',express.static(path.join(__dirname, '/public'))); // '/' request for static files comming to this will use this subdirectory it is / by default

// router
app.use('/', require('./routes/root')); 
app.use('/register', require('./routes/api/register')); 
app.use('/auth', require('./routes/api/auth')); 

// refresh token
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));

// verify using jwt
app.use(verifyJWT);
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