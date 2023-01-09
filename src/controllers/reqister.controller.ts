import { errorLogger, eventLogger } from './../middleware/logEvents';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ReqUserNamePwd } from '../schema/user.schema';
import { User, userDb } from '../model/usersDb';

export const handleNewUser = async (
  req: Request<{}, {}, ReqUserNamePwd['body']>,
  res: Response
) => {
  const { username, password } = req.body;

  // find duplicate users
  const duplicate = userDb.users.find((person) => person.username === username);
  if (duplicate) return res.sendStatus(409); // conflict

  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser: User = {
      username,
      roles: {
        User: 2001,
      },
      password: hashedPwd,
    };
    userDb.setUsers([...userDb.users, newUser]);
    eventLogger(`new user ${username} was created`);
    res.status(201).json({ success: `new user ${username} was created` });
  } catch (err: any) {
    errorLogger(err);
    res.send(500).json({ 'message': (err as Error).message });
  }
};
