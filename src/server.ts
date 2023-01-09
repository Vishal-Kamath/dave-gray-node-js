// import enviroment variables using dotenv
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// imports
import express, { Application, Request, Response } from 'express';
import { verifyJwt } from './middleware/verifyJwt';
import { requestLogger } from './middleware/logEvents';
import { errorHandler } from './middleware/logEvents';
import { router as rootRouter } from './routes/root';
import { router as employeesRouter } from './routes/api/employees';
import { router as registerRouter } from './routes/api/register';
import { router as authRouter } from './routes/api/auth';
import { router as refreshTokenRouter } from './routes/api/refresh';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions';

// creating an express app
const app: Application = express();
const PORT = process.env.PORT || 3500;

// custom logger
app.use(requestLogger);

// Cors - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware
// handle url encoded data / form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);

// JWT
app.use(verifyJwt);

app.use('/employees', employeesRouter);

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
