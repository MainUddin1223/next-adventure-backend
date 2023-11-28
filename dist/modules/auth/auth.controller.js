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
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/errorHandlers/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const auth_validation_1 = require("./auth.validation");
const auth_constant_1 = require("./auth.constant");
const apiError_1 = __importDefault(require("../../utils/errorHandlers/apiError"));
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { error } = yield auth_validation_1.signUpSchema.validate(req.body);
    if (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            success: false,
            message: ((_a = error.details[0]) === null || _a === void 0 ? void 0 : _a.message) || auth_constant_1.authResponseMessage.signUpFailed,
            data: error.details,
        });
    }
    else if (((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) !== ((_c = req.body) === null || _c === void 0 ? void 0 : _c.confirmPassword)) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            success: false,
            message: 'Confirm password not matched',
            data: 'Confirm password not matched',
        });
    }
    else {
        const result = yield auth_service_1.authService.signUp(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: auth_constant_1.authResponseMessage.signUpSuccessful,
            data: result,
        });
    }
}));
const registerAgency = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { error } = yield auth_validation_1.agencyRegisterSchema.validate(req.body);
    if (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            success: false,
            message: ((_d = error.details[0]) === null || _d === void 0 ? void 0 : _d.message) || auth_constant_1.authResponseMessage.agencyRegisterFailed,
            data: error.details,
        });
    }
    else {
        const result = yield auth_service_1.authService.registerAgency(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: auth_constant_1.authResponseMessage.agencyRegisterSuccessful,
            data: result,
        });
    }
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { error } = yield auth_validation_1.signUpSchema.validate(req.body);
    if (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            success: false,
            message: (_e = error.details[0]) === null || _e === void 0 ? void 0 : _e.message,
            data: error.details,
        });
    }
    else {
        const result = yield auth_service_1.authService.login(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: auth_constant_1.authResponseMessage.loginSuccessful,
            data: result,
        });
    }
}));
const getProfileData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const result = yield auth_service_1.authService.getProfile((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.userId, (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: auth_constant_1.authResponseMessage.profileDataMsg,
        data: result,
    });
}));
const deleteAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const result = yield auth_service_1.authService.deleteAccount((_h = req.user) === null || _h === void 0 ? void 0 : _h.authId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: auth_constant_1.authResponseMessage.accountDeleteMsg,
        data: result,
    });
}));
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o;
    const validateSchema = ((_j = req.user) === null || _j === void 0 ? void 0 : _j.role) === 'agency'
        ? auth_validation_1.updateAgencyProfileSchema
        : auth_validation_1.updateUserProfileSchema;
    const { error } = yield validateSchema.validate(req.body);
    if (error) {
        console.log((_k = error.details[0]) === null || _k === void 0 ? void 0 : _k.message);
        throw new apiError_1.default(500, (_l = error.details[0]) === null || _l === void 0 ? void 0 : _l.message);
    }
    yield auth_service_1.authService.updateProfile((_m = req === null || req === void 0 ? void 0 : req.user) === null || _m === void 0 ? void 0 : _m.role, (_o = req === null || req === void 0 ? void 0 : req.user) === null || _o === void 0 ? void 0 : _o.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: auth_constant_1.authResponseMessage.accountUpdateMsg,
        data: auth_constant_1.authResponseMessage.accountUpdateMsg,
    });
}));
exports.authController = {
    signUp,
    registerAgency,
    login,
    getProfileData,
    deleteAccount,
    updateProfile,
};
