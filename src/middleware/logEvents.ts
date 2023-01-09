import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { format } from 'date-fns';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// main function to log events
const logEvents = async (
  message: string,
  logFileName: 'reqLogs.txt' | 'errLogs.txt' | 'eventLog.txt'
) => {
  const logPath = path.join(__dirname, '..', 'logs');
  const dateTime = format(new Date(), 'dd-MMM-yyyy\tHH:mm:ss');
  const logMessage = `${dateTime}\t${crypto.randomUUID()}${message}`;

  try {
    if (!fs.existsSync(logPath)) await fsPromises.mkdir(logPath);
    await fsPromises.appendFile(path.join(logPath, logFileName), logMessage);
  } catch (err) {
    console.log(err);
  }
};

// log events in eventLogs.txt
export const eventLogger = (message: string) => {
  logEvents(`\t${message}\n`, 'eventLog.txt');
};

// log request in reqLogs.txt
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `\t${req.method}\t${req.headers.origin}\t${req.url}\n`,
    'reqLogs.txt'
  );
  next();
};

// log errors in errLogs.txt
export const errorLogger = (err: any) => {
  logEvents(`\n${err.stack}\n\n`, 'errLogs.txt');
};

// handle express errors and log it to errLogs.txt
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `\t${req.method}\t${req.headers.origin}\t${req.url}\n${err.stack}\n\n`,
    'errLogs.txt'
  );
  res.status(500).send(err.message);
};
