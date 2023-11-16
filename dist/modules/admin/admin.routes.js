"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../utils/auth_jwt/verifyAuth");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.route('/users').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getUsers);
router.route('/admins').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getAdmins);
router.route('/agencies').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getAgencies);
router
    .route('/schedules')
    .get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getUpcomingSchedules);
router.route('/plans').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getAllPlans);
router.route('/bookings').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getBookings);
router
    .route('/bookings/:id')
    .get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getBookingById)
    .patch(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.manageSchedule);
router.route('/plans/:id').get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getPlanDetailsById);
router
    .route('/agencies/:id')
    .get(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.getAgencyDetailsById);
router
    .route('/manage-plan-payout/:id')
    .patch(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.releasePayoutByBooking);
router
    .route('/manage-booking-payout/:id')
    .patch(verifyAuth_1.verifyAdmin, admin_controller_1.AdminController.releasePayoutByBooking);
exports.default = { adminRouter: router };
