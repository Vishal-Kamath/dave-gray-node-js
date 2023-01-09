import { userNamePwdSchema } from './../../schema/user.schema';
import express from 'express';
import validateResource from '../../middleware/validateResource';
import * as registerController from './../../controllers/reqister.controller';
const router = express.Router();

router.post(
  '/',
  validateResource(userNamePwdSchema),
  registerController.handleNewUser
);

export { router };
