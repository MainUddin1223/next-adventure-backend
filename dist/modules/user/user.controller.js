'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(
  require('../../utils/errorHandlers/catchAsync')
);
const user_service_1 = require('./user.service');
const pagination_1 = require('../../utils/helpers/pagination');
const user_constant_1 = require('./user.constant');
const pick_1 = __importDefault(require('../../utils/helpers/pick'));
const http_status_codes_1 = require('http-status-codes');
const sendResponse_1 = __importDefault(
  require('../../utils/helpers/sendResponse')
);
const user_validator_1 = require('./user.validator');
const getAgencies = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      user_constant_1.agenciesSearchOptions
    );
    const result = yield user_service_1.userService.getAgencies(
      paginationOptions,
      filter
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.agenciesSuccess,
      data: result,
    });
  })
);
const getTourPlans = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      user_constant_1.tourPlanFilterOptions
    );
    const result = yield user_service_1.userService.getTourPlans(
      paginationOptions,
      filter
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.plansSuccess,
      data: result,
    });
  })
);
const getAgencyById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield user_service_1.userService.getAgencyById(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.agencyDataSuccess,
      data: result,
    });
  })
);
const getPlanDetails = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield user_service_1.userService.getTourPlanById(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.planDetailsSuccess,
      data: result,
    });
  })
);
const reviewPlatform = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { error } = yield user_validator_1.reviewSchema.validate(req.body);
    if (error) {
      (0, sendResponse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message:
          ((_a = error.details[0]) === null || _a === void 0
            ? void 0
            : _a.message) || user_constant_1.userControllerMsg.reviewError,
        data: error.details,
      });
    } else {
      const userId = Number(
        (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId
      );
      const data = req.body;
      const result = yield user_service_1.userService.reviewPlatform(
        Object.assign(Object.assign({}, data), { userId })
      );
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: user_constant_1.userControllerMsg.reviewSuccess,
        data: result,
      });
    }
  })
);
const getLandingPageData = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getLandingPageData();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.landingPageSuccess,
      data: result,
    });
  })
);
const bookPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { error } = yield user_validator_1.bookPlanSchema.validate(req.body);
    if (error) {
      (0, sendResponse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message:
          ((_c = error.details[0]) === null || _c === void 0
            ? void 0
            : _c.message) || user_constant_1.userControllerMsg.bookPlanError,
        data: error.details,
      });
    } else {
      const planId = Number(req.params.id);
      const userId = Number(
        (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId
      );
      const seats = Number(req.body.totalSeat);
      const result = yield user_service_1.userService.bookPlan({
        planId,
        userId,
        seats,
      });
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: user_constant_1.userControllerMsg.bookPlanSuccess,
        data: result,
      });
    }
  })
);
const reviewPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const { error } = yield user_validator_1.reviewSchema.validate(req.body);
    if (error) {
      (0, sendResponse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message:
          ((_e = error.details[0]) === null || _e === void 0
            ? void 0
            : _e.message) || user_constant_1.userControllerMsg.planReviewError,
        data: error.details,
      });
    } else {
      const bookingId = Number(req.params.id);
      const userId = Number(
        (_f = req.user) === null || _f === void 0 ? void 0 : _f.userId
      );
      const { rating, feedback } = req.body;
      const result = yield user_service_1.userService.reviewPlan({
        bookingId,
        userId,
        rating,
        feedback,
      });
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: user_constant_1.userControllerMsg.planReviewSuccess,
        data: result,
      });
    }
  })
);
const getUpcomingSchedules = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const userId = Number(
      (_g = req.user) === null || _g === void 0 ? void 0 : _g.userId
    );
    const result = yield user_service_1.userService.getUpcomingSchedules(
      userId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.upcomingSchedulesSuccess,
      data: result,
    });
  })
);
const getAllBookings = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      user_constant_1.agenciesSearchOptions
    );
    const userId = Number(
      (_h = req.user) === null || _h === void 0 ? void 0 : _h.userId
    );
    const result = yield user_service_1.userService.getAllBookings(
      userId,
      paginationOptions,
      filter
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.bookingsSuccess,
      data: result.result,
      meta: result.meta,
    });
  })
);
const manageSchedule = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const id = Number(req.params.id);
    const status = req.query.status;
    const userId = Number(
      (_j = req.user) === null || _j === void 0 ? void 0 : _j.userId
    );
    const result = yield user_service_1.userService.manageSchedule(
      id,
      userId,
      status
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: user_constant_1.userControllerMsg.scheduleUpdateSuccess,
      data: result,
    });
  })
);
exports.userController = {
  getAgencies,
  getTourPlans,
  getAgencyById,
  getPlanDetails,
  reviewPlatform,
  getLandingPageData,
  bookPlan,
  reviewPlan,
  getUpcomingSchedules,
  getAllBookings,
  manageSchedule,
};
