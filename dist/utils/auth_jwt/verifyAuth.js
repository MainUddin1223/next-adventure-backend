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
exports.verifyAgency = exports.verifySuperAdmin = exports.verifyAuth = exports.verifyUser = exports.verifyAdmin = void 0;
const config_1 = __importDefault(require("../config"));
const client_1 = require("@prisma/client");
const jwtToken_1 = require("./jwtToken");
const prisma = new client_1.PrismaClient();
const verifyAuthWithRole = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt.jwt_access_secret);
            let isExist;
            if (!decoded.authId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (decoded.role === 'agency') {
                isExist = yield prisma.agency.findUnique({
                    where: {
                        id: decoded.userId,
                    },
                    select: {
                        id: true,
                        auth: {
                            select: {
                                id: true,
                                role: true,
                                accountStatus: true,
                            },
                        },
                    },
                });
            }
            else {
                isExist = yield prisma.user.findUnique({
                    where: {
                        id: decoded.userId,
                    },
                    select: {
                        id: true,
                        auth: {
                            select: {
                                id: true,
                                role: true,
                                accountStatus: true,
                            },
                        },
                    },
                });
            }
            if (!(isExist === null || isExist === void 0 ? void 0 : isExist.id) || !allowedRoles.includes((_a = isExist.auth) === null || _a === void 0 ? void 0 : _a.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = {
                authId: isExist.auth.id,
                role: isExist.auth.role,
                userId: isExist.id,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
const verifyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt.jwt_access_secret);
        let isExist;
        if (!decoded.authId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (decoded.role === 'agency') {
            isExist = yield prisma.agency.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    id: true,
                    auth: {
                        select: {
                            id: true,
                            role: true,
                            accountStatus: true,
                        },
                    },
                },
            });
        }
        else {
            isExist = yield prisma.user.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    id: true,
                    auth: {
                        select: {
                            id: true,
                            role: true,
                            accountStatus: true,
                        },
                    },
                },
            });
        }
        if ((isExist === null || isExist === void 0 ? void 0 : isExist.auth.accountStatus) !== 'active') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            authId: isExist.auth.id,
            role: isExist.auth.role,
            userId: isExist.id,
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAuth = verifyAuth;
const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
exports.verifyAdmin = verifyAdmin;
const verifySuperAdmin = verifyAuthWithRole(['super_admin']);
exports.verifySuperAdmin = verifySuperAdmin;
const verifyUser = verifyAuthWithRole(['user']);
exports.verifyUser = verifyUser;
const verifyAgency = verifyAuthWithRole(['agency']);
exports.verifyAgency = verifyAgency;
