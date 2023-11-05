import express from 'express';
import { verifyAgency } from '../../utils/auth_jwt/verifyAuth';
import { agencyController } from './agency.controller';

const router = express.Router();

router
  .route('/create-plan')
  .post(verifyAgency, agencyController.createTourPlan);

export default { agencyRouter: router };
