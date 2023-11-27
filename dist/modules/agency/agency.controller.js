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
exports.agencyController = void 0;
const catchAsync_1 = __importDefault(
  require('../../utils/errorHandlers/catchAsync')
);
const agency_service_1 = require('./agency.service');
const sendResponse_1 = __importDefault(
  require('../../utils/helpers/sendResponse')
);
const http_status_codes_1 = require('http-status-codes');
const agency_constant_1 = require('./agency.constant');
const agency_validation_1 = require('./agency.validation');
const pagination_1 = require('../../utils/helpers/pagination');
const pick_1 = __importDefault(require('../../utils/helpers/pick'));
const apiError_1 = __importDefault(
  require('../../utils/errorHandlers/apiError')
);
const createTourPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { error } = yield agency_validation_1.createPlanSchema.validate(
      req.body
    );
    if (error) {
      (0, sendResponse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message:
          ((_a = error.details[0]) === null || _a === void 0
            ? void 0
            : _a.message) ||
          agency_constant_1.agencyControllerMsg.createPlanSchemaError,
        data: error.details,
      });
    } else {
      const agencyId = Number(
        (_b = req === null || req === void 0 ? void 0 : req.user) === null ||
          _b === void 0
          ? void 0
          : _b.userId
      );
      const result = yield agency_service_1.agencyService.createTourPlan(
        Object.assign(Object.assign({}, req.body), { agencyId })
      );
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: agency_constant_1.agencyControllerMsg.createPlanSuccess,
        data: result,
      });
    }
  })
);
const updateTourPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { error } = yield agency_validation_1.updatePlanSchema.validate(
      req.body
    );
    if (error) {
      (0, sendResponse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message:
          ((_c = error.details[0]) === null || _c === void 0
            ? void 0
            : _c.message) ||
          agency_constant_1.agencyControllerMsg.updatePlanSchemaError,
        data: error.details,
      });
    } else {
      const agencyId = Number(
        (_d = req === null || req === void 0 ? void 0 : req.user) === null ||
          _d === void 0
          ? void 0
          : _d.userId
      );
      const planId = Number(req.params.id);
      const result = yield agency_service_1.agencyService.updateTourPlan(
        planId,
        Object.assign(Object.assign({}, req.body), { agencyId })
      );
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: agency_constant_1.agencyControllerMsg.updatePlanSuccess,
        data: result,
      });
    }
  })
);
const getPlanDetails = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const agencyId = Number(
      (_e = req === null || req === void 0 ? void 0 : req.user) === null ||
        _e === void 0
        ? void 0
        : _e.userId
    );
    const planId = Number(req.params.id);
    const result = yield agency_service_1.agencyService.getPlanDetails(
      planId,
      agencyId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: agency_constant_1.agencyControllerMsg.planDetailsSuccess,
      data: result,
    });
  })
);
const getUpcomingSchedules = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const paginationOptions = (0, pagination_1.pagination)(
      Object.assign(Object.assign({}, req.query), {
        sortBy: 'departureTime',
        sortOrder: 'asc',
      })
    );
    const filter = (0, pick_1.default)(
      req.query,
      agency_constant_1.upcomingSchedulesFilters
    );
    const agencyId = Number(
      (_f = req.user) === null || _f === void 0 ? void 0 : _f.userId
    );
    const result = yield agency_service_1.agencyService.getScheduledPlans(
      paginationOptions,
      filter,
      agencyId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: agency_constant_1.agencyControllerMsg.upcomingSchedulesSuccess,
      data: result,
    });
  })
);
const getAllPlans = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const paginationOptions = (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      agency_constant_1.upcomingSchedulesFilters
    );
    const agencyId = Number(
      (_g = req.user) === null || _g === void 0 ? void 0 : _g.userId
    );
    const result = yield agency_service_1.agencyService.getScheduledPlans(
      paginationOptions,
      filter,
      agencyId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: agency_constant_1.agencyControllerMsg.plansSuccess,
      data: result,
    });
  })
);
const manageSchedule = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const id = Number(req.params.id);
    const status = req.query.status;
    const agencyId = Number(
      (_h = req.user) === null || _h === void 0 ? void 0 : _h.userId
    );
    if (status == 'confirmed' || status == 'rejected') {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        agency_constant_1.agencyControllerMsg.manageScheduleError
      );
    }
    const result = yield agency_service_1.agencyService.manageSchedule(
      id,
      agencyId,
      status
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: agency_constant_1.agencyControllerMsg.manageScheduleSuccess,
      data: result,
    });
  })
);
const agencyStatics = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const agencyId = Number(
      (_j = req.user) === null || _j === void 0 ? void 0 : _j.userId
    );
    const result = yield agency_service_1.agencyService.agencyStatics(agencyId);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: agency_constant_1.agencyControllerMsg.staticsSuccess,
      data: result,
    });
  })
);
exports.agencyController = {
  createTourPlan,
  getUpcomingSchedules,
  getAllPlans,
  updateTourPlan,
  getPlanDetails,
  manageSchedule,
  agencyStatics,
};
