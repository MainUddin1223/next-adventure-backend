import { PrismaClient } from '@prisma/client';
import { IFilterOption, IPaginationValue } from '../../utils/helpers/interface';
import { BookPlanPayload, IReviewPlatform } from './user.interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { userServiceMessage } from './user.constant';

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

  const result = await prisma.agency.findMany({
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
      totalReviews: true,
      totalStar: true,
    },
  });

  const totalCount = await prisma.agency.count();

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
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
      planName: true,
      id: true,
      departureTime: true,
      departureFrom: true,
      deadline: true,
      destination: true,
      images: true,
      price: true,
      agency: {
        select: {
          name: true,
          location: true,
          id: true,
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

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
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
  });
  const agencies = await prisma.agency.findMany({ take: 6 });
  const reviews = await prisma.reviews.findMany();
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

export const userService = {
  getAgencies,
  getTourPlans,
  getAgencyById,
  getTourPlanById,
  reviewPlatform,
  getLandingPageData,
  bookPlan,
};
