import express from 'express';
import { userController } from './user.controller';
import { verifyAuth, verifyUser } from '../../utils/auth_jwt/verifyAuth';

const router = express.Router();
// public api
router.route('/data').get(userController.getLandingPageData);
router.route('/agencies').get(userController.getAgencies);
router.route('/plans').get(userController.getTourPlans);
// authenticated api
router.route('/agencies/:id').get(verifyAuth, userController.getAgencyById);
router.route('/plans/:id').get(verifyAuth, userController.getPlanDetails);
// user api
router.route('/review').post(verifyUser, userController.reviewPlatform);
router.route('/book-plan/:id').post(verifyUser, userController.bookPlan);
router
  .route('/order-summary/:id')
  .post(verifyUser, userController.getOrderSummary);
router.route('/booking/review/:id').post(verifyUser, userController.reviewPlan);
router
  .route('/upcoming-schedule')
  .get(verifyUser, userController.getUpcomingSchedules);

router.route('/bookings').get(verifyUser, userController.getAllBookings);
router
  .route('/manage-Schedule/:id')
  .patch(verifyUser, userController.manageSchedule);

export default { userRouter: router };
