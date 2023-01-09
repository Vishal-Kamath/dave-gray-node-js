import { Roles } from './../config/roles_list';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorLogger } from './logEvents';
import { User } from '../model/usersDb';

export type VerifyRequest = Request & { username?: string; roles?: number[] };

export const verifyJwt = (
  req: VerifyRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = (req.headers['authorization'] ||
    req.headers['Authorization']) as string;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

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
    req.username = decoded.UserInfo.username;
    res.locals.roles = decoded.UserInfo.roles;
    next();
  });
};
