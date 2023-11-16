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
exports.agencyService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../utils/errorHandlers/apiError"));
const http_status_codes_1 = require("http-status-codes");
const agency_constant_1 = require("./agency.constant");
const prisma = new client_1.PrismaClient();
const createTourPlan = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plan.create({ data });
    return result;
});
const updateTourPlan = (planId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidPlan = yield prisma.plan.findUnique({
        where: {
            id: planId,
            deadline: {
                gt: new Date(),
            },
        },
    });
    if (!isValidPlan) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, agency_constant_1.agencyServiceMsg.updatePlanError);
    }
    const result = yield prisma.plan.update({
        where: {
            id: planId,
            deadline: {
                gt: new Date(),
            },
        },
        data,
    });
    return result;
});
const getPlanDetails = (id, agencyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plan.findFirst({ where: { id, agencyId } });
    return result;
});
const getScheduledPlans = (meta, filterOptions, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
        const { search } = filterOptions, restOptions = __rest(filterOptions, ["search"]);
        if (search) {
            queryOption['OR'] = [
                {
                    planName: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    destination: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        Object.entries(restOptions).forEach(([field, value]) => {
            queryOption[field] = value;
        });
    }
    const result = yield prisma.plan.findMany({
        skip: Number(skip),
        take,
        orderBy,
        where: Object.assign({ agencyId: id, deadline: {
                gt: new Date(),
            } }, queryOption),
        include: {
            bookings: true,
        },
    });
    const totalCount = yield prisma.plan.count({ where: { agencyId: id } });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
const getAllPlans = (meta, filterOptions, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
        const { search } = filterOptions, restOptions = __rest(filterOptions, ["search"]);
        if (search) {
            queryOption['OR'] = [
                {
                    planName: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    destination: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        Object.entries(restOptions).forEach(([field, value]) => {
            queryOption[field] = value;
        });
    }
    const result = yield prisma.plan.findMany({
        skip: Number(skip),
        take,
        orderBy,
        where: Object.assign({ agencyId: id }, queryOption),
        include: {
            bookings: true,
        },
    });
    const totalCount = yield prisma.plan.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
const manageSchedule = (id, agencyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const getSchedule = yield prisma.bookings.findUnique({
        where: {
            id,
            agencyId,
            plan: {
                deadline: {
                    gt: new Date(),
                },
            },
        },
    });
    if (!getSchedule) {
        throw new apiError_1.default(500, agency_constant_1.agencyServiceMsg.deadlineExpireScheduleError);
    }
    let result;
    if (getSchedule.status === 'pending' || getSchedule.status === 'requested') {
        result = yield prisma.bookings.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }
    else {
        throw new apiError_1.default(500, agency_constant_1.agencyServiceMsg.invalidStatusError);
    }
    return result;
});
const agencyStatics = (agencyId) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const payouts = yield prisma.$queryRaw `
    SELECT po.status,po."totalAmount", pl."departureTime",b.status as booking_status 
    FROM payouts as po 
    INNER JOIN "plan" as pl ON po."planId" = pl.id
    INNER JOIN bookings as b ON po."bookingId" = b.id
    WHERE po."agencyId" = ${agencyId}
   `;
    const result = payouts.reduce((acc, current) => {
        const { status, totalAmount, departureTime, booking_status } = current;
        if (!acc[status]) {
            acc[status] = 0;
        }
        if (booking_status == 'confirmed') {
            if (status == 'pending' && departureTime > date) {
                acc['upcoming'] += Number(totalAmount);
            }
            else {
                acc[status] += Number(totalAmount);
            }
        }
        else {
            acc['canceled'] += Number(totalAmount);
        }
        return acc;
    }, {
        pending: 0,
        released: 0,
        upcoming: 0,
        canceled: 0,
    });
    return result;
});
exports.agencyService = {
    createTourPlan,
    updateTourPlan,
    getScheduledPlans,
    getAllPlans,
    getPlanDetails,
    manageSchedule,
    agencyStatics,
};
