import { userNamePwdSchema } from './../../schema/user.schema';
import express from 'express';
import validateResource from '../../middleware/validateResource';
import * as authController from './../../controllers/auth.controller';
import { blankSchema } from '../../schema/blank.schema';
const router = express.Router();

router.post(
  '/',
  validateResource(blankSchema, userNamePwdSchema, blankSchema),
  authController.handleLogin
);

export { router };
