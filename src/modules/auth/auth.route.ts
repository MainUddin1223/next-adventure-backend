import express from 'express';
import { authController } from './auth.controller';
import { verifyAuth } from '../../utils/auth_jwt/verifyAuth';
const router = express.Router();

router.route('/sign-up').post(authController.signUp);
router.route('/register-agency').post(authController.registerAgency);
router.route('/login').post(authController.login);
router.route('/profile').get(verifyAuth, authController.getProfileData);

export default { authRouter: router };
