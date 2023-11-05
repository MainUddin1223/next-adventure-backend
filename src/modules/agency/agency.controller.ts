import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { agencyService } from './agency.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import {
  agencyControllerMsg,
  upcomingSchedulesFilters,
} from './agency.constant';
import { createPlanSchema } from './agency.validation';
import { pagination } from '../../utils/helpers/pagination';
import pick from '../../utils/helpers/pick';

const createTourPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await createPlanSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: agencyControllerMsg.createPlanSchemaError,
      data: error.details,
    });
  } else {
    const agencyId = Number(req?.user?.userId);
    console.log(req.user);
    const result = await agencyService.createTourPlan({
      ...req.body,
      agencyId,
    });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: agencyControllerMsg.createPlanSuccess,
      data: result,
    });
  }
});

const getUpcomingSchedules = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination({
    ...req.query,
    sortBy: 'departureTime',
    sortOrder: 'asc',
  });
  const filter = pick(req.query, upcomingSchedulesFilters);
  const agencyId = Number(req.user?.userId);
  const result = await agencyService.getScheduledPlans(
    paginationOptions,
    filter,
    agencyId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Upcoming schedules retrieved successfully',
    data: result,
  });
});
export const agencyController = { createTourPlan, getUpcomingSchedules };
