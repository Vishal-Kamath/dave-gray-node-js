import express from 'express';
import * as refreshTokenController from './../../controllers/refreshToken.controller';
const router = express.Router();

router.get('/', refreshTokenController.handleRefresh);

export { router };
