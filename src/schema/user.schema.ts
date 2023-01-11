import { z } from 'zod';

export const userNamePwdSchema = z.object({
  username: z.string({
    required_error: 'username is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
});

export type ReqUserNamePwd = z.infer<typeof userNamePwdSchema>;
