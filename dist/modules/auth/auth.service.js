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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtToken_1 = require("../../utils/auth_jwt/jwtToken");
const config_1 = __importDefault(require("../../utils/config"));
const apiError_1 = __importDefault(require("../../utils/errorHandlers/apiError"));
const http_status_codes_1 = require("http-status-codes");
const auth_utils_1 = require("./auth.utils");
const auth_constant_1 = require("./auth.constant");
const prisma = new client_1.PrismaClient();
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, data = __rest(payload, ["email", "password"]);
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Insert into auth table
        const auth = yield prisma.auth.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        // Insert into user table
        const userInfo = yield prisma.user.create({
            data: Object.assign(Object.assign({}, data), { authId: auth.id }),
        });
        return { userInfo, auth };
    }));
    const accessData = {
        role: result.auth.role,
        authId: result.auth.id,
        userId: result.userInfo.id,
    };
    const accessToken = yield jwtToken_1.jwtToken.createToken(accessData, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
        profileData: { profileImg: result.userInfo.profileImg },
    };
});
const registerAgency = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, data = __rest(payload, ["email", "password"]);
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield prisma.auth.create({
            data: {
                email,
                password: hashedPassword,
                role: 'agency',
            },
        });
        const agencyData = yield prisma.agency.create({
            data: Object.assign(Object.assign({}, data), { authId: auth.id }),
        });
        return { agencyData, auth };
    }));
    const authData = {
        role: result.auth.role,
        authId: result.auth.id,
        userId: result.agencyData.id,
    };
    const accessToken = yield jwtToken_1.jwtToken.createToken(authData, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
        profileData: { profileImg: result.agencyData.profileImg },
    };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma.auth.findFirst({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, auth_constant_1.authServiceMessage.serverErrorMsg);
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, auth_constant_1.authServiceMessage.serverErrorMsg);
    }
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus) !== 'active') {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, `${auth_constant_1.authServiceMessage.accountStatusMsg} ${isUserExist.accountStatus}`);
    }
    if (isUserExist.role === 'agency') {
        const accessToken = yield (0, auth_utils_1.getAgencyAuthInfo)(isUserExist.id);
        return accessToken;
    }
    else {
        const accessToken = yield (0, auth_utils_1.getUserAuthInfo)(isUserExist.id);
        return accessToken;
    }
});
const getProfile = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'agency') {
        const result = yield prisma.agency.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                contactNo: true,
                profileImg: true,
                featured: true,
                totalReviews: true,
                rating: true,
                about: true,
                location: true,
                auth: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        return result;
    }
    else {
        const result = yield prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                contactNo: true,
                about: true,
                profileImg: true,
                auth: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        return result;
    }
});
const deleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.auth.update({
        where: {
            id,
        },
        data: {
            accountStatus: 'deleted',
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, auth_constant_1.authServiceMessage.serverErrorMsg);
    }
    return auth_constant_1.authServiceMessage.deleteAccountMsg;
});
const updateProfile = (role, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role == 'agency') {
        result = yield (0, auth_utils_1.updateAgencyProfile)(id, data);
    }
    else {
        result = yield (0, auth_utils_1.updateUserAdminProfile)(id, data);
    }
    return result;
});
exports.authService = {
    signUp,
    registerAgency,
    login,
    getProfile,
    deleteAccount,
    updateProfile,
};
