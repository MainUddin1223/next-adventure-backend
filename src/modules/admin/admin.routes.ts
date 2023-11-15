import express from 'express';
import { verifyAdmin } from '../../utils/auth_jwt/verifyAuth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.route('/users').get(verifyAdmin, AdminController.getUsers);

export default { adminRouter: router };
