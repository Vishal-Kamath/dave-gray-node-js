import { errorLogger } from './../middleware/logEvents';
import usersDataJson from './user.json';
import fsPromises from 'fs/promises';
import path from 'path';

export type User = {
  username: string;
  roles?: {
    User?: number;
    Editor?: number;
    Admin?: number;
  };
  password: string;
  refreshToken?: string;
};

type UserDb = {
  users: User[];
  setUsers: (data: User[]) => void;
};

export const userDb: UserDb = {
  users: usersDataJson,
  setUsers: async function (data: User[]) {
    try {
      this.users = data;
      await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'user.json'),
        JSON.stringify(userDb.users)
      );
    } catch (err) {
      errorLogger(err);
    }
  },
};
