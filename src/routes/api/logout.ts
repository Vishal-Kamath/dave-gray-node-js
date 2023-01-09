import express from 'express';
import * as logoutController from './../../controllers/logout.controller';
const router = express.Router();

router.get('/', logoutController.handleLogout);

export { router };
