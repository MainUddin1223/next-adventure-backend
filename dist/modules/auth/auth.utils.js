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
exports.updateAgencyProfile =
  exports.updateUserAdminProfile =
  exports.getAgencyAuthInfo =
  exports.getUserAuthInfo =
    void 0;
const client_1 = require('@prisma/client');
const jwtToken_1 = require('../../utils/auth_jwt/jwtToken');
const config_1 = __importDefault(require('../../utils/config'));
const prisma = new client_1.PrismaClient();
const getUserAuthInfo = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield prisma.user.findFirst({
      where: {
        authId: id,
      },
      select: {
        id: true,
        profileImg: true,
        auth: {
          select: {
            id: true,
            role: true,
          },
        },
      },
    });
    const authData = {
      userId: result === null || result === void 0 ? void 0 : result.id,
      authId: result === null || result === void 0 ? void 0 : result.auth.id,
      role:
        (_a = result === null || result === void 0 ? void 0 : result.auth) ===
          null || _a === void 0
          ? void 0
          : _a.role,
    };
    const accessToken = yield jwtToken_1.jwtToken.createToken(
      authData,
      config_1.default.jwt.jwt_access_secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken,
      profileData: {
        profileImg:
          result === null || result === void 0 ? void 0 : result.profileImg,
      },
    };
  });
exports.getUserAuthInfo = getUserAuthInfo;
const getAgencyAuthInfo = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield prisma.agency.findFirst({
      where: {
        authId: id,
      },
      select: {
        id: true,
        profileImg: true,
        auth: {
          select: {
            id: true,
            role: true,
          },
        },
      },
    });
    const authData = {
      userId: result === null || result === void 0 ? void 0 : result.id,
      authId: result === null || result === void 0 ? void 0 : result.auth.id,
      role:
        (_b = result === null || result === void 0 ? void 0 : result.auth) ===
          null || _b === void 0
          ? void 0
          : _b.role,
    };
    const accessToken = yield jwtToken_1.jwtToken.createToken(
      authData,
      config_1.default.jwt.jwt_access_secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken,
      profileData: {
        profileImg:
          result === null || result === void 0 ? void 0 : result.profileImg,
      },
    };
  });
exports.getAgencyAuthInfo = getAgencyAuthInfo;
const updateUserAdminProfile = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return result;
  });
exports.updateUserAdminProfile = updateUserAdminProfile;
const updateAgencyProfile = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.agency.update({
      where: {
        id,
      },
      data,
    });
    return result;
  });
exports.updateAgencyProfile = updateAgencyProfile;
