import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();
router.route('/').get(paymentController.payment);

export default { paymentRouter: router };
