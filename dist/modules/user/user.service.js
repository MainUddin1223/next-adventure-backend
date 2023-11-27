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
exports.userService = void 0;
const client_1 = require('@prisma/client');
const apiError_1 = __importDefault(
  require('../../utils/errorHandlers/apiError')
);
const http_status_codes_1 = require('http-status-codes');
const user_constant_1 = require('./user.constant');
const prisma = new client_1.PrismaClient();
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
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            location: {
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
    const result = yield prisma.agency.findMany({
      skip,
      take,
      orderBy,
      where: Object.assign({}, queryOption),
      select: {
        id: true,
        name: true,
        profileImg: true,
        rating: true,
        plans: {
          where: {
            deadline: {
              gt: new Date(),
            },
          },
          select: {
            id: true,
          },
        },
      },
    });
    result.forEach(agency => {
      if (
        (agency === null || agency === void 0 ? void 0 : agency.plans) &&
        agency.plans.length
      ) {
        agency['ongoingPlans'] = agency.plans.length;
        delete agency.plans;
      } else {
        agency['ongoingPlans'] = 0;
        delete agency.plans;
      }
    });
    const totalCount = yield prisma.agency.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getTourPlans = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search, max_price, min_price } = filterOptions,
        restOptions = __rest(filterOptions, [
          'search',
          'max_price',
          'min_price',
        ]);
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
            duration: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            departureFrom: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ];
      }
      if (max_price || min_price) {
        if (max_price) {
          const price = { lte: max_price };
          queryOption['price'] = price;
        }
        if (min_price) {
          const price = { gte: min_price };
          queryOption['price'] = price;
        }
      }
      Object.entries(restOptions).forEach(([field, value]) => {
        queryOption[field] = value;
      });
    }
    const result = yield prisma.plan.findMany({
      skip,
      take,
      orderBy,
      where: Object.assign(Object.assign({}, queryOption), {
        deadline: {
          gt: new Date(),
        },
      }),
      select: {
        id: true,
        planName: true,
        images: true,
        destination: true,
        departureFrom: true,
        deadline: true,
        price: true,
        agency: {
          select: {
            id: true,
            name: true,
            rating: true,
            profileImg: true,
          },
        },
      },
    });
    const totalCount = yield prisma.plan.count({
      where: {
        deadline: {
          gt: new Date(),
        },
      },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAgencyById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.agency.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        contactNo: true,
        profileImg: true,
        rating: true,
        totalReviews: true,
        about: true,
        plans: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
          select: {
            planName: true,
            id: true,
            departureTime: true,
            departureFrom: true,
            deadline: true,
            destination: true,
            images: true,
            price: true,
          },
        },
        planReviews: {
          select: {
            feedback: true,
            rating: true,
            createdAt: true,
            plan: {
              select: {
                planName: true,
                images: true,
                destination: true,
              },
            },
            user: {
              select: {
                profileImg: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  });
const getTourPlanById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plan.findUnique({
      where: {
        id,
      },
      select: {
        planName: true,
        id: true,
        departureFrom: true,
        departureTime: true,
        price: true,
        duration: true,
        coverLocations: true,
        meals: true,
        description: true,
        images: true,
        deadline: true,
        destination: true,
        events: true,
        notAllowed: true,
        totalSeats: true,
        totalBooking: true,
        status: true,
        agency: {
          select: {
            name: true,
            id: true,
            rating: true,
            profileImg: true,
          },
        },
      },
    });
    return result;
  });
const reviewPlatform = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.reviews.create({ data });
    return result;
  });
const getLandingPageData = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield prisma.plan.findMany({
      take: 6,
      where: {
        deadline: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        planName: true,
        images: true,
        destination: true,
        departureFrom: true,
        deadline: true,
        price: true,
        agency: {
          select: {
            id: true,
            name: true,
            rating: true,
            profileImg: true,
          },
        },
      },
    });
    const agencies = yield prisma.agency.findMany({
      take: 6,
      select: {
        id: true,
        name: true,
        rating: true,
        profileImg: true,
      },
    });
    const reviews = yield prisma.reviews.findMany({
      select: {
        rating: true,
        feedback: true,
        user: {
          select: {
            name: true,
            profileImg: true,
          },
        },
      },
    });
    return { plans, agencies, reviews };
  });
const bookPlan = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId, planId, seats } = payload;
    const isValidPlan = yield prisma.plan.findUnique({
      where: {
        id: planId,
        deadline: {
          gt: new Date(),
        },
      },
    });
    if (!isValidPlan) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_ACCEPTABLE,
        user_constant_1.userServiceMessage.invalidPlan
      );
    }
    const totalBooking = isValidPlan.totalBooking + Number(seats);
    if (totalBooking > isValidPlan.totalSeats) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_ACCEPTABLE,
        user_constant_1.userServiceMessage.seatsUnavailable
      );
    }
    const totalAmount = (Number(isValidPlan.price) * seats).toFixed(2);
    const bookingData = {
      seats,
      totalAmount,
      userId,
      agencyId: isValidPlan.agencyId,
      planId,
    };
    const result = yield prisma.$transaction(prisma =>
      __awaiter(void 0, void 0, void 0, function* () {
        const booking = yield prisma.bookings.create({ data: bookingData });
        yield prisma.payouts.create({
          data: {
            agencyId: isValidPlan.agencyId,
            planId,
            bookingId: booking.id,
            totalAmount,
          },
        });
        yield prisma.plan.update({
          where: {
            id: planId,
          },
          data: {
            totalBooking,
          },
        });
        return {
          totalAmount,
          totalBooking: seats,
          planName: isValidPlan.planName,
        };
      })
    );
    return result;
  });
const reviewPlan = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, feedback, rating, userId } = payload;
    const alreadyReviewed = yield prisma.planReviews.findFirst({
      where: {
        bookingId,
        userId: userId,
      },
    });
    if (alreadyReviewed) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        user_constant_1.userServiceMessage.alreadyReviewedPlan
      );
    }
    const validReview = yield prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        id: true,
        agencyId: true,
        planId: true,
        plan: true,
        status: true,
      },
    });
    if (!validReview) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        user_constant_1.userServiceMessage.invalidPlanReview
      );
    }
    if (validReview.plan.departureTime > new Date()) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_ACCEPTABLE,
        user_constant_1.userServiceMessage.yetToExperience
      );
    }
    if (
      (validReview === null || validReview === void 0
        ? void 0
        : validReview.status) !== 'confirmed'
    ) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        user_constant_1.userServiceMessage.notConfirmed
      );
    }
    const data = {
      rating,
      feedback,
      userId,
      planId: validReview.plan.id,
      agencyId: validReview.agencyId,
      bookingId: validReview.id,
    };
    yield prisma.planReviews.create({ data });
    return { message: 'Review submitted successfully' };
  });
const getUpcomingSchedules = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bookings.findMany({
      where: {
        userId,
        plan: {
          departureTime: {
            gt: new Date(),
          },
        },
      },
      select: {
        id: true,
        totalAmount: true,
        seats: true,
        status: true,
        plan: {
          select: {
            departureTime: true,
            departureFrom: true,
            planName: true,
            destination: true,
          },
        },
        agency: {
          select: {
            name: true,
            contactNo: true,
            profileImg: true,
          },
        },
      },
    });
    return result;
  });
const getAllBookings = (userId, meta, filterOptions) =>
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
            plan: {
              destination: {
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
      skip,
      take,
      orderBy,
      where: Object.assign({ userId }, queryOption),
      select: {
        id: true,
        totalAmount: true,
        seats: true,
        status: true,
        plan: {
          select: {
            departureTime: true,
            departureFrom: true,
            planName: true,
            destination: true,
          },
        },
        agency: {
          select: {
            name: true,
            contactNo: true,
            profileImg: true,
          },
        },
      },
    });
    const totalCount = yield prisma.bookings.count({ where: { userId } });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const manageSchedule = (id, userId, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const getSchedule = yield prisma.bookings.findUnique({
      where: {
        id,
        userId,
        plan: {
          deadline: {
            gt: new Date(),
          },
        },
      },
    });
    if (!getSchedule) {
      throw new apiError_1.default(500, 'Invalid schedule');
    }
    let result;
    if (getSchedule.status === 'canceled' && status === 'requested') {
      result = yield prisma.bookings.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    }
    if (
      getSchedule.status === 'confirmed' ||
      (getSchedule.status === 'pending' && status === 'canceled')
    ) {
      result = yield prisma.bookings.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    } else {
      throw new apiError_1.default(500, 'Invalid status');
    }
    return result;
  });
exports.userService = {
  getAgencies,
  getTourPlans,
  getAgencyById,
  getTourPlanById,
  reviewPlatform,
  getLandingPageData,
  bookPlan,
  reviewPlan,
  getUpcomingSchedules,
  getAllBookings,
  manageSchedule,
};
