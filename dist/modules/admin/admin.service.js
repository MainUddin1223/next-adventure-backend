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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.adminService = void 0;
const client_1 = require('@prisma/client');
const apiError_1 = __importDefault(
  require('../../utils/errorHandlers/apiError')
);
const http_status_codes_1 = require('http-status-codes');
const admin_constant_1 = require('./admin.constant');
const prisma = new client_1.PrismaClient();
const getUsersOrAdmins = (meta, filterOptions, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
      if (search) {
        queryOption['OR'] = [
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            agency: {
              some: {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          },
        ];
      }
      Object.entries(restOptions).forEach(([field, value]) => {
        queryOption[field] = value;
      });
    }
    const result = yield prisma.auth.findMany({
      skip: Number(skip),
      take,
      orderBy,
      where: Object.assign({ role }, queryOption),
      select: {
        id: true,
        accountStatus: true,
        email: true,
        user: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
      },
    });
    const totalCount = yield prisma.auth.count({
      where: { role },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAgencies = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
      if (search) {
        queryOption['OR'] = [
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            agency: {
              some: {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          },
        ];
      }
      Object.entries(restOptions).forEach(([field, value]) => {
        queryOption[field] = value;
      });
    }
    const result = yield prisma.auth.findMany({
      skip: Number(skip),
      take,
      orderBy,
      where: Object.assign({ role: 'agency' }, queryOption),
      select: {
        id: true,
        accountStatus: true,
        email: true,
        agency: {
          select: {
            id: true,
            name: true,
            contactNo: true,
            profileImg: true,
            rating: true,
          },
        },
      },
    });
    const totalCount = yield prisma.auth.count({
      where: { role: 'agency' },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAgencyDetailsById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.agency.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        contactNo: true,
        featured: true,
        location: true,
        rating: true,
        totalReviews: true,
        totalStar: true,
        profileImg: true,
        auth: {
          select: {
            email: true,
            accountStatus: true,
            role: true,
          },
        },
        plans: {
          select: {
            planName: true,
            id: true,
            deadline: true,
            destination: true,
          },
        },
        Payouts: {
          select: {
            id: true,
            status: true,
            totalAmount: true,
            plan: {
              select: {
                departureTime: true,
              },
            },
          },
        },
      },
    });
    return result;
  });
const upcomingSchedules = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    const date = new Date();
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
      if (search) {
        queryOption['OR'] = [
          {
            planName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            agency: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
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
      where: Object.assign(Object.assign({}, queryOption), {
        departureTime: {
          gt: date,
        },
      }),
      select: {
        id: true,
        status: true,
        destination: true,
        images: true,
        deadline: true,
        agency: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const totalCount = yield prisma.plan.count({
      where: {
        deadline: {
          gt: date,
        },
      },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAllPlans = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
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
          {
            agency: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
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
      where: Object.assign({}, queryOption),
      select: {
        id: true,
        status: true,
        destination: true,
        deadline: true,
        departureTime: true,
        images: true,
        agency: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
      },
    });
    const totalCount = yield prisma.plan.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getPlanDetailsById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plan.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });
    return result;
  });
const getBookings = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
      if (search) {
        queryOption['OR'] = [
          {
            plan: {
              planName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            agency: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }
      Object.entries(restOptions).forEach(([field, value]) => {
        queryOption[field] = value;
      });
    }
    const result = yield prisma.bookings.findMany({
      skip: Number(skip),
      take,
      orderBy,
      where: Object.assign({}, queryOption),
      select: {
        id: true,
        status: true,
        seats: true,
        agency: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
        plan: {
          select: {
            planName: true,
            destination: true,
          },
        },
      },
    });
    const totalCount = yield prisma.plan.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getBookingById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bookings.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            profileImg: true,
            contactNo: true,
            auth: {
              select: {
                email: true,
              },
            },
          },
        },
        agency: {
          select: {
            name: true,
            contactNo: true,
            profileImg: true,
          },
        },
        plan: {
          select: {
            planName: true,
            deadline: true,
            destination: true,
            price: true,
          },
        },
        payouts: {
          select: {
            status: true,
            totalAmount: true,
          },
        },
      },
    });
    return result;
  });
const manageSchedule = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const getBooking = yield prisma.bookings.findUnique({
      where: { id },
      include: {
        plan: true,
      },
    });
    if (!getBooking) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        admin_constant_1.adminServiceMsg.bookingNotFound
      );
    }
    if (getBooking.plan.deadline < new Date()) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        admin_constant_1.adminServiceMsg.bookingDeadlineError
      );
    }
    if (getBooking.status === 'canceled') {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        admin_constant_1.adminServiceMsg.notChangeableError
      );
    }
    if (getBooking.status === 'pending' && status == 'pending') {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        admin_constant_1.adminServiceMsg.sameStatusError
      );
    }
    if (getBooking.status !== 'postponed' && status == 'pending') {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        admin_constant_1.adminServiceMsg.invalidStatus
      );
    }
    const result = yield prisma.bookings.update({
      where: { id },
      data: { status },
    });
    return result;
  });
const releasePayoutByPlan = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.payouts.updateMany({
      where: {
        planId: id,
        status: 'pending',
        plan: {
          departureTime: {
            gt: new Date(),
          },
        },
        booking: {
          status: 'confirmed',
        },
      },
      data: {
        status: 'released',
      },
    });
    return { result: 'Payout released successfully' };
  });
const managePayout = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const getPayout = yield prisma.payouts.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
        booking: true,
      },
    });
    if (!getPayout) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Payout not found'
      );
    }
    if (getPayout.plan.departureTime > new Date()) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Booking yet to be completed successfully'
      );
    }
    if (getPayout.booking.status !== 'confirmed') {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Booking was not completed successfully'
      );
    }
    if (getPayout.status !== 'released') {
      yield prisma.payouts.update({
        where: { id },
        data: { status },
      });
    } else {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
    return { result: 'Payout released successfully' };
  });
exports.adminService = {
  getUsersOrAdmins,
  getAgencies,
  upcomingSchedules,
  getAllPlans,
  getAgencyDetailsById,
  getPlanDetailsById,
  getBookings,
  getBookingById,
  manageSchedule,
  releasePayoutByPlan,
  managePayout,
};
