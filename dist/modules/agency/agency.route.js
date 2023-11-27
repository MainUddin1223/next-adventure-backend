"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../utils/auth_jwt/verifyAuth");
const agency_controller_1 = require("./agency.controller");
const router = express_1.default.Router();
router
    .route('/create-plan')
    .post(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.createTourPlan);
router
    .route('/upcoming-schedules')
    .get(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.getUpcomingSchedules);
router.route('/plans').get(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.getAllPlans);
router
    .route('/plan/:id')
    .patch(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.updateTourPlan)
    .get(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.getPlanDetails);
router
    .route('/manage-booking/:id')
    .patch(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.manageSchedule);
router.route('/statics').get(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.agencyStatics);
router.route('/payouts').get(verifyAuth_1.verifyAgency, agency_controller_1.agencyController.getPayouts);
exports.default = { agencyRouter: router };
