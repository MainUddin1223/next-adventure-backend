import { PrismaClient } from '@prisma/client';
import { IFilterOption, IPaginationValue } from '../../utils/helpers/interface';
import stripe from 'stripe';

import {
  BookPlanPayload,
  IAgencyResult,
  IOrderSummary,
  IReviewPlan,
  IReviewPlatform,
} from './user.interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { userServiceMessage } from './user.constant';
import config from '../../utils/config';
const stripeToken = config.stripe_secret as string;
const prisma = new PrismaClient();

const getAgencies = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

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

  const result: IAgencyResult[] | [] = await prisma.agency.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
    },
    select: {
      id: true,
      name: true,
      profileImg: true,
      rating: true,
      location: true,
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
    if (agency?.plans && agency.plans.length) {
      agency['ongoingPlans'] = agency.plans.length;
      delete agency.plans;
    } else {
      agency['ongoingPlans'] = 0;
      delete agency.plans;
    }
  });

  const totalCount = await prisma.agency.count();

  const totalPage =
    totalCount > take ? Math.ceil(totalCount / Number(take)) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getTourPlans = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, max_price, min_price, ...restOptions } = filterOptions;

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

  const result = await prisma.plan.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
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

  const totalCount = await prisma.plan.count({
    where: {
      deadline: {
        gt: new Date(),
      },
    },
  });

  const totalPage =
    totalCount > take ? Math.ceil(totalCount / Number(take)) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAgencyById = async (id: number) => {
  const result = await prisma.agency.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      contactNo: true,
      profileImg: true,
      rating: true,
      totalReviews: true,
      location: true,
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
};

const getTourPlanById = async (id: number) => {
  const result = await prisma.plan.findUnique({
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
};

const reviewPlatform = async (data: IReviewPlatform) => {
  const result = await prisma.reviews.create({ data });
  return result;
};

const getLandingPageData = async () => {
  const plans = await prisma.plan.findMany({
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

  const agencies: IAgencyResult[] | [] = await prisma.agency.findMany({
    take: 6,
    select: {
      id: true,
      name: true,
      profileImg: true,
      rating: true,
      location: true,
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

  agencies.forEach(agency => {
    if (agency?.plans && agency.plans.length) {
      agency['ongoingPlans'] = agency.plans.length;
      delete agency.plans;
    } else {
      agency['ongoingPlans'] = 0;
      delete agency.plans;
    }
  });

  const reviews = await prisma.reviews.findMany({
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
};

const bookPlan = async (payload: BookPlanPayload) => {
  const { userId, planId, seats } = payload;
  const isValidPlan = await prisma.plan.findUnique({
    where: {
      id: planId,
      deadline: {
        gt: new Date(),
      },
    },
  });
  if (!isValidPlan) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      userServiceMessage.invalidPlan
    );
  }
  const totalBooking = isValidPlan.totalBooking + Number(seats);
  if (totalBooking > isValidPlan.totalSeats) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      userServiceMessage.seatsUnavailable
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

  const result = await prisma.$transaction(async prisma => {
    const booking = await prisma.bookings.create({ data: bookingData });
    await prisma.payouts.create({
      data: {
        agencyId: isValidPlan.agencyId,
        planId,
        bookingId: booking.id,
        totalAmount,
      },
    });
    await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        totalBooking,
      },
    });
    return { totalAmount, totalBooking: seats, planName: isValidPlan.planName };
  });
  return result;
};

const reviewPlan = async (payload: IReviewPlan) => {
  const { bookingId, feedback, rating, userId } = payload;
  const alreadyReviewed = await prisma.planReviews.findFirst({
    where: {
      bookingId,
      userId: userId,
    },
  });
  if (alreadyReviewed) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      userServiceMessage.alreadyReviewedPlan
    );
  }
  const validReview = await prisma.bookings.findUnique({
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
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      userServiceMessage.invalidPlanReview
    );
  }
  if (validReview.plan.departureTime > new Date()) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      userServiceMessage.yetToExperience
    );
  }
  if (validReview?.status !== 'confirmed') {
    throw new ApiError(StatusCodes.NOT_FOUND, userServiceMessage.notConfirmed);
  }
  const data = {
    rating,
    feedback,
    userId,
    planId: validReview.plan.id,
    agencyId: validReview.agencyId,
    bookingId: validReview.id,
  };
  const agency = await prisma.agency.findUnique({
    where: {
      id: validReview.agencyId,
    },
  });

  const totalReviews = Number(agency?.totalReviews) + 1;
  const totalStar = Number(agency?.totalStar) + rating;
  const totalRating = totalStar / totalReviews;

  await prisma.$transaction(async prisma => {
    await prisma.agency.update({
      where: {
        id: validReview.agencyId,
      },
      data: {
        totalReviews,
        totalStar,
        rating: totalRating,
      },
    });
    await prisma.planReviews.create({ data });
  });

  return { message: 'Review submitted successfully' };
};

const getUpcomingSchedules = async (userId: number) => {
  const result = await prisma.bookings.findMany({
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
          deadline: true,
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
  return { result };
};

const getAllBookings = async (
  userId: number,
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

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

  const result = await prisma.bookings.findMany({
    skip,
    take,
    orderBy,
    where: {
      userId,
      ...queryOption,
      plan: {
        departureTime: {
          lt: new Date(),
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
          id: true,
          name: true,
          contactNo: true,
          profileImg: true,
        },
      },
    },
  });
  const totalCount = await prisma.bookings.count({ where: { userId } });

  const totalPage =
    totalCount > take ? Math.ceil(totalCount / Number(take)) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const manageSchedule = async (
  id: number,
  userId: number,
  status: 'canceled' | 'requested'
) => {
  const getSchedule = await prisma.bookings.findUnique({
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
    throw new ApiError(500, 'Invalid schedule');
  }
  let result;
  if (getSchedule.status === 'canceled' && status === 'requested') {
    result = await prisma.bookings.update({
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
    result = await prisma.bookings.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } else {
    throw new ApiError(500, 'Invalid status');
  }
  return result;
};

const getOrderSummary = async (payload: IOrderSummary) => {
  const stripeInit = new stripe(stripeToken);
  const { planId, seats } = payload;

  const isValidPlan = await prisma.plan.findUnique({
    where: {
      id: planId,
      deadline: {
        gt: new Date(),
      },
    },
  });

  if (!isValidPlan) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      userServiceMessage.invalidPlan
    );
  }

  const totalBooking = isValidPlan.totalBooking + Number(seats);

  if (totalBooking > isValidPlan.totalSeats) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      userServiceMessage.seatsUnavailable
    );
  }

  const totalAmount =
    Number((Number(isValidPlan.price) * seats).toFixed(2)) * 100;

  const paymentIntent = await stripeInit.paymentIntents.create({
    amount: totalAmount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return paymentIntent;
};

export const userService = {
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
  getOrderSummary,
};
