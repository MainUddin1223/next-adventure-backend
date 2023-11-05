import express from 'express';
import { authController } from './auth.controller';
const router = express.Router();

router.route('/sign-up').post(authController.signUp);
router.route('/register-agency').post(authController.registerAgency);

export default { authRouter: router };
