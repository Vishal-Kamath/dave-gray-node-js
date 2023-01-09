import { errorLogger } from './../middleware/logEvents';
import { userDb } from '../model/usersDb';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const handleRefresh = (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookie.jwt;

  // find user
  const foundUser = userDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // verify refresh jwt
  const refresh_public = process.env.REFRESH_SECRET_PUBLIC;
  if (!refresh_public) {
    errorLogger(new Error('refresh token public key undefined'));
    return res.sendStatus(500);
  }
  jwt.verify(refreshToken, refresh_public, (err, decoded: any) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403); // Forbidden

    // roles
    const roles = Object.values(foundUser.roles);

    // refresh token verified create access token
    // Access Token
    const access_private = process.env.ACCESS_SECRET_PRIVATE;
    if (!access_private) {
      errorLogger(new Error('access token private key undefined'));
      return res.sendStatus(500);
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      access_private,
      { expiresIn: '30s', algorithm: 'RS256' }
    );
    res.json({ accessToken });
  });
};
