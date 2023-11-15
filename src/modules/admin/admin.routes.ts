import express from 'express';
import { verifyAdmin } from '../../utils/auth_jwt/verifyAuth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.route('/users').get(verifyAdmin, AdminController.getUsers);
router.route('/admins').get(verifyAdmin, AdminController.getAdmins);
router.route('/agencies').get(verifyAdmin, AdminController.getAgencies);
router
  .route('/schedules')
  .get(verifyAdmin, AdminController.getUpcomingSchedules);
router.route('/plans').get(verifyAdmin, AdminController.getAllPlans);
router.route('/bookings').get(verifyAdmin, AdminController.getBookings);
router
  .route('/bookings/:id')
  .get(verifyAdmin, AdminController.getBookingById)
  .patch(verifyAdmin, AdminController.manageSchedule);
router.route('/plans/:id').get(verifyAdmin, AdminController.getPlanDetailsById);
router
  .route('/agencies/:id')
  .get(verifyAdmin, AdminController.getAgencyDetailsById);

export default { adminRouter: router };
