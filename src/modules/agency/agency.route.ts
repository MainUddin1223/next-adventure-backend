import express from 'express';
import { verifyAgency } from '../../utils/auth_jwt/verifyAuth';
import { agencyController } from './agency.controller';

const router = express.Router();

router
  .route('/create-plan')
  .post(verifyAgency, agencyController.createTourPlan);
router
  .route('/upcoming-schedules')
  .get(verifyAgency, agencyController.getUpcomingSchedules);

export default { agencyRouter: router };
