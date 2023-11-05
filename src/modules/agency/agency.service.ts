import { PrismaClient } from '@prisma/client';
import { IPlanData } from './agency.interface';

const prisma = new PrismaClient();

const createTourPlan = async (data: IPlanData) => {
  const result = await prisma.plan.create({ data });
  return result;
};

export const agencyService = { createTourPlan };
