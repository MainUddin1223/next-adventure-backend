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

export const agencyService = {
  createTourPlan,
  updateTourPlan,
  getScheduledPlans,
  getAllPlans,
  getPlanDetails,
};
