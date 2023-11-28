import { PrismaClient } from '@prisma/client';
import { IPayouts, IPlanData, IUpdatePlan } from './agency.interface';
import { IFilterOption, IPaginationValue } from '../../utils/helpers/interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { agencyServiceMsg } from './agency.constant';

const prisma = new PrismaClient();

const createTourPlan = async (data: IPlanData) => {
  const result = await prisma.plan.create({ data });
  return result;
};

const updateTourPlan = async (planId: number, data: IUpdatePlan) => {
  const isValidPlan = await prisma.plan.findUnique({
    where: {
      id: planId,
      deadline: {
        gt: new Date(),
      },
    },
  });
  if (!isValidPlan) {
    throw new ApiError(StatusCodes.FORBIDDEN, agencyServiceMsg.updatePlanError);
  }
  const result = await prisma.plan.update({
    where: {
      id: planId,
    },
    data,
  });
  return result;
};

const getPlanDetails = async (id: number, agencyId: number) => {
  const result = await prisma.plan.findFirst({ where: { id, agencyId } });
  return result;
};

const getScheduledPlans = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption,
  id: number
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

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
  const result = await prisma.plan.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      agencyId: id,
      deadline: {
        gt: new Date(),
      },
      ...queryOption,
    },
    include: {
      bookings: true,
    },
  });
  const totalCount = await prisma.plan.count({ where: { agencyId: id } });
  const totalPage =
    totalCount > take ? Math.ceil(totalCount / Number(take)) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAllPlans = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption,
  id: number
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

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
  const result = await prisma.plan.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      agencyId: id,
      ...queryOption,
    },
    include: {
      bookings: true,
    },
  });
  const totalCount = await prisma.plan.count();
  const totalPage =
    totalCount > take ? Math.ceil(totalCount / Number(take)) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const manageSchedule = async (
  id: number,
  agencyId: number,
  status: 'confirmed' | 'rejected'
) => {
  const getSchedule = await prisma.bookings.findUnique({
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
    throw new ApiError(500, agencyServiceMsg.deadlineExpireScheduleError);
  }

  let result;
  if (getSchedule.status === 'pending' || getSchedule.status === 'requested') {
    result = await prisma.bookings.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } else {
    throw new ApiError(500, agencyServiceMsg.invalidStatusError);
  }
  return result;
};

const agencyStatics = async (agencyId: number) => {
  const date = new Date();
  const payouts: IPayouts[] = await prisma.$queryRaw`
    SELECT po.status,po."totalAmount", pl."departureTime",b.status as booking_status 
    FROM payouts as po 
    INNER JOIN "plan" as pl ON po."planId" = pl.id
    INNER JOIN bookings as b ON po."bookingId" = b.id
    WHERE po."agencyId" = ${agencyId}
   `;
  const result = payouts.reduce(
    (acc, current: IPayouts) => {
      const { status, totalAmount, departureTime, booking_status } = current;

      if (!acc[status]) {
        acc[status] = 0;
      }
      if (booking_status == 'confirmed') {
        if (status == 'pending' && departureTime > date) {
          acc['upcoming'] += Number(totalAmount);
        } else {
          acc[status] += Number(totalAmount);
        }
      } else {
        acc['canceled'] += Number(totalAmount);
      }

      return acc;
    },
    {
      pending: 0,
      released: 0,
      upcoming: 0,
      canceled: 0,
    }
  );
  return result;
};

const getPayouts = async (
  id: number,
  meta: IPaginationValue,
  status?: 'pending' | 'released' | 'postponed'
) => {
  // const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (status) {
    queryOption['status'] = status;
  }
  const result = await prisma.payouts.findMany({
    // skip: Number(skip),
    // take,
    // orderBy,
    where: {
      agencyId: id,
      ...queryOption,
    },
    select: {
      status: true,
      totalAmount: true,
      createdAt: true,
      planId: true,
      booking: {
        select: {
          seats: true,
        },
      },
      plan: {
        select: {
          planName: true,
          price: true,
        },
      },
    },
  });
  // const totalCount = await prisma.plan.count({
  //   where: { ...queryOption }
  // });
  // const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return { result };
  // return {
  //   result,
  //   meta: { page: page, size: take, total: totalCount, totalPage },
  // };
};

export const agencyService = {
  createTourPlan,
  updateTourPlan,
  getScheduledPlans,
  getAllPlans,
  getPlanDetails,
  manageSchedule,
  agencyStatics,
  getPayouts,
};
