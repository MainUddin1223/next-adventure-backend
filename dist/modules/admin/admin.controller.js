"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/errorHandlers/catchAsync"));
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../utils/helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const pagination_1 = require("../../utils/helpers/pagination");
const admin_constant_1 = require("./admin.constant");
const pick_1 = __importDefault(require("../../utils/helpers/pick"));
const apiError_1 = __importDefault(require("../../utils/errorHandlers/apiError"));
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.getUsersOrAdmins(paginationOptions, filter, 'user');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.getUsersSuccess,
        data: result,
    });
}));
const getAdmins = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.getUsersOrAdmins(paginationOptions, filter, 'admin');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.getAdminsSuccess,
        data: result,
    });
}));
const getAgencies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.getAgencies(paginationOptions, filter);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.getAgenciesSuccess,
        data: result,
    });
}));
const getAgencyDetailsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.getAgencyDetailsById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.agencyDetailsSuccess,
        data: result,
    });
}));
const getUpcomingSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.upcomingSchedules(paginationOptions, filter);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.upcomingSchedulesSuccess,
        data: result,
    });
}));
const getAllPlans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.getAllPlans(paginationOptions, filter);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.allPlansSuccess,
        data: result,
    });
}));
const getPlanDetailsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.getPlanDetailsById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.planDetailsSuccess,
        data: result,
    });
}));
const getBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.getUsersFilterOptions);
    const result = yield admin_service_1.adminService.getBookings(paginationOptions, filter);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.bookingsSuccess,
        data: result,
    });
}));
const getBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.getBookingById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.bookingDetailsSuccess,
        data: result,
    });
}));
const manageSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const status = req.query.status;
    if (status == 'pending' || status === 'postponed') {
        const result = yield admin_service_1.adminService.manageSchedule(id, status);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: admin_constant_1.AdminControllerMsg.manageBookingSuccess,
            data: result,
        });
    }
    else {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid status');
    }
}));
const releasePayoutByPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.releasePayoutByPlan(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: admin_constant_1.AdminControllerMsg.manageBookingSuccess,
        data: result,
    });
}));
const releasePayoutByBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const status = req.query.status;
    if (status == 'released' || status === 'postponed') {
        const result = yield admin_service_1.adminService.managePayout(id, status);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: admin_constant_1.AdminControllerMsg.manageBookingSuccess,
            data: result,
        });
    }
    else {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid status');
    }
}));
exports.AdminController = {
    getUsers,
    getAdmins,
    getAgencies,
    getAgencyDetailsById,
    getUpcomingSchedules,
    getAllPlans,
    getPlanDetailsById,
    getBookings,
    getBookingById,
    manageSchedule,
    releasePayoutByPlan,
    releasePayoutByBooking,
};
