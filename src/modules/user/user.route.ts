import express from 'express';
import { userController } from './user.controller';
import { verifyAuth, verifyUser } from '../../utils/auth_jwt/verifyAuth';

const router = express.Router();

router.route('/agencies').get(userController.getAgencies);
router.route('/plans').get(userController.getTourPlans);
router.route('/agencies/:id').get(verifyAuth, userController.getAgencyById);
router.route('/plans/:id').get(verifyAuth, userController.getPlanDetails);
router.route('/review').post(verifyUser, userController.reviewPlatform);
router.route('/data').get(userController.getLandingPageData);
router.route('/book-plan/:id').post(verifyUser, userController.bookPlan);

export default { userRouter: router };
