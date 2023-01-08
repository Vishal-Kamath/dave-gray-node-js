// import enviroment variables using dotenv
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// imports
import express, { Application, Request, Response, NextFunction } from 'express';
import { requestLogger } from './middleware/logEvents';

// creating an express app
const app: Application = express();
const PORT = process.env.PORT || 3500;

// custom logger
app.use(requestLogger);

// Middleware
// handle url encoded data / form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('^/$|/index(.html)?', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.all('/*', (req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
