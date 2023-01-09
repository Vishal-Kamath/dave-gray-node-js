import { errorLogger } from './../middleware/logEvents';
import { User, userDb } from '../model/usersDb';
import { Request, Response } from 'express';

export const handleLogout = (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204); // successful as we were going to erase it any way
  const refreshToken: string = cookie.jwt;

  // find user
  const foundUser = userDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    // user was not found but cookie was present in req
    // clear that cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
    });
    return res.sendStatus(204);
  }

  // delete cookie in db
  const currentUser: User = {
    username: foundUser.username,
    password: foundUser.password,
  };
  const newUsersdb = userDb.users.map((user) =>
    user.username !== foundUser.username ? user : currentUser
  );
  userDb.setUsers(newUsersdb);

  // clear cookie from request
  res.clearCookie('jwt', {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
  });
  res.sendStatus(204);
};
