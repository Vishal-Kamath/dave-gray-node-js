import { userNamePwdSchema } from './../../schema/user.schema';
import express from 'express';
import validateResource from '../../middleware/validateResource';
import * as authController from './../../controllers/auth.controller';
const router = express.Router();

router.post(
  '/',
  validateResource(userNamePwdSchema),
  authController.handleLogin
);

export { router };
