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
router.route('/plans').get(verifyAgency, agencyController.getAllPlans);
router
  .route('/plan/:id')
  .patch(verifyAgency, agencyController.updateTourPlan)
  .get(verifyAgency, agencyController.getPlanDetails);

router
  .route('manage-booking/:id')
  .patch(verifyAgency, agencyController.manageSchedule);

export default { agencyRouter: router };
