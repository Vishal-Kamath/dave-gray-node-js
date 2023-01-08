import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { format } from 'date-fns';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const logEvents = async (
  message: string,
  logFileName: 'reqLogs.txt' | 'errLogs.txt'
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

export const errorLogger = (err: any) => {
  logEvents(`\n${err.stack}\n\n`, 'errLogs.txt');
};
