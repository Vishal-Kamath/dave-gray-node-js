import { User, userDb } from '../model/usersDb';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ReqUserNamePwd } from '../schema/user.schema';

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
    // note create JWT
    res.json({ success: `User ${username} is logged in` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
