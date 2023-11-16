"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyAuth_1 = require("../../utils/auth_jwt/verifyAuth");
const router = express_1.default.Router();
// public api
router.route('/data').get(user_controller_1.userController.getLandingPageData);
router.route('/agencies').get(user_controller_1.userController.getAgencies);
router.route('/plans').get(user_controller_1.userController.getTourPlans);
// authenticated api
router.route('/agencies/:id').get(verifyAuth_1.verifyAuth, user_controller_1.userController.getAgencyById);
router.route('/plans/:id').get(verifyAuth_1.verifyAuth, user_controller_1.userController.getPlanDetails);
// user api
router.route('/review').post(verifyAuth_1.verifyUser, user_controller_1.userController.reviewPlatform);
router.route('/book-plan/:id').post(verifyAuth_1.verifyUser, user_controller_1.userController.bookPlan);
router.route('/booking/review/:id').post(verifyAuth_1.verifyUser, user_controller_1.userController.reviewPlan);
router
    .route('/upcoming-schedule')
    .get(verifyAuth_1.verifyUser, user_controller_1.userController.getUpcomingSchedules);
router.route('/bookings').get(verifyAuth_1.verifyUser, user_controller_1.userController.getAllBookings);
router
    .route('/manage-Schedule/:id')
    .patch(verifyAuth_1.verifyUser, user_controller_1.userController.manageSchedule);
exports.default = { userRouter: router };
