import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorLogger } from './logEvents';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = (req.headers['authorization'] ||
    req.headers['Authorization']) as string;
  if (!authHeader) return res.sendStatus(401); // Unauthorized

  // get token
  const token = authHeader.split(' ')[1];

  // verify Access Token
  const access_public = process.env.ACCESS_SECRET_PUBLIC;
  if (!access_public) {
    errorLogger(new Error('access token public key undefined'));
    return res.sendStatus(500);
  }
  jwt.verify(token, access_public, (err, decoded: any) => {
    if (err) return res.sendStatus(403); // Forbidden
    // @ts-ignore
    req.username = decoded.username;
    next();
  });
};
