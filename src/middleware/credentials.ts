import { allowedOrigins } from '../config/corsOptions';
import { Request, Response, NextFunction } from 'express';

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    //@ts-ignore
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  next();
};

export default credentials;
