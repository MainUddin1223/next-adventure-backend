import { PrismaClient } from '@prisma/client';
import { IPlanData } from './agency.interface';
import { IFilterOption, IPaginationValue } from '../../utils/helpers/interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { agencyServiceMsg } from './agency.constant';

const prisma = new PrismaClient();

const createTourPlan = async (data: IPlanData) => {
  const result = await prisma.plan.create({ data });
  return result;
};

const updateTourPlan = async (planId: number, data: Partial<IPlanData>) => {
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
      deadline: {
        gt: new Date(),
      },
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
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
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
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
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
    throw new ApiError(500, 'Invalid schedule');
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
    throw new ApiError(500, 'Invalid status');
  }
  return result;
};

export interface IPayouts {
  status: 'pending' | 'rejected' | 'released';
  totalAmount: number;
  departureTime: Date;
}

const agencyStatics = async (agencyId: number) => {
  const date = new Date();
  const payouts: IPayouts[] = await prisma.$queryRaw`
    SELECT po.status,po."totalAmount", pl."departureTime" 
    FROM payouts as po 
    INNER JOIN "plan" as pl ON po."planId" = pl.id
    WHERE po."agencyId" = ${agencyId}
   `;
  const result = await payouts.reduce(
    (acc: any, current: any) => {
      const { status, totalAmount, departureTime } = current;

      // Initialize status with 0 if it doesn't exist
      if (!acc[status]) {
        acc[status] = 0;
      }
      if (status == 'pending' && departureTime > date) {
        acc['upcoming'] += Number(totalAmount);
      } else {
        acc[status] += Number(totalAmount);
      }

      return acc;
    },
    {
      pending: 0,
      released: 0,
      postponed: 0,
      upcoming: 0,
    }
  );
  return result;
};

export const agencyService = {
  createTourPlan,
  updateTourPlan,
  getScheduledPlans,
  getAllPlans,
  getPlanDetails,
  manageSchedule,
  agencyStatics,
};
