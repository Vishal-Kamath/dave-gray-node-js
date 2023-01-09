import { errorLogger } from './../middleware/logEvents';
import { User, userDb } from '../model/usersDb';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ReqUserNamePwd } from '../schema/user.schema';
import jwt from 'jsonwebtoken';

export const handleLogin = async (
  req: Request<{}, {}, ReqUserNamePwd['body']>,
  res: Response
) => {
  const { username, password } = req.body;

  // find user
  const foundUser = userDb.users.find((person) => person.username === username);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWT

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

    // Refresh Token
    const refresh_private = process.env.REFRESH_SECRET_PRIVATE;
    if (!refresh_private) {
      errorLogger(new Error('refresh token private key undefined'));
      return res.sendStatus(500);
    }
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      refresh_private,
      { expiresIn: '1d', algorithm: 'RS256' }
    );
    const currentUser: User = {
      ...foundUser,
      refreshToken,
    };

    // saving refresh token with user
    const newUsersdb = userDb.users.map((user) =>
      user.username !== foundUser.username ? user : currentUser
    );
    userDb.setUsers(newUsersdb);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none', // as client and server can be on different domain
      secure: true,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
