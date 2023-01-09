// import enviroment variables using dotenv
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// imports
import express, { Application, Request, Response, NextFunction } from 'express';
import { requestLogger } from './middleware/logEvents';
import cors from 'cors';
import { errorHandler } from './middleware/logEvents';

// creating an express app
const app: Application = express();
const PORT = process.env.PORT || 3500;

// custom logger
app.use(requestLogger);

// Cors - Cross Origin Resource Sharing
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.youtube.com',
  `http://localhost:${PORT}`,
];
const node_env = process.env.NODE_ENV;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // if development allow undefined
    if (node_env === 'development' && origin === undefined) {
      return callback(null, true);
    }

    // else reject undefined
    if (origin === undefined) return callback(new Error('not allowed by CORS'));

    // check allowed
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
// handle url encoded data / form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Index.html
app.get('^/$|/index(.html)?', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// 404
app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
  }
  if (req.accepts('json')) {
    res.json({ error: '404 not found' });
  }
  if (req.accepts('txt')) {
    res.send('404 not found');
  }
});

// Error handling
app.use(errorHandler);

// Listening
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
