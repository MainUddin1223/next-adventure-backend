import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { agencyService } from './agency.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import {
  agencyControllerMsg,
  payoutsFilter,
  upcomingSchedulesFilters,
} from './agency.constant';
import { createPlanSchema, updatePlanSchema } from './agency.validation';
import { pagination } from '../../utils/helpers/pagination';
import pick from '../../utils/helpers/pick';
import ApiError from '../../utils/errorHandlers/apiError';

const createTourPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await createPlanSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message:
        error.details[0]?.message || agencyControllerMsg.createPlanSchemaError,
      data: error.details,
    });
  } else {
    const agencyId = Number(req?.user?.userId);
    const totalSeats = Number(req.body.totalSeats);
    const result = await agencyService.createTourPlan({
      ...req.body,
      totalSeats,
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

const updateTourPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await updatePlanSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message:
        error.details[0]?.message || agencyControllerMsg.updatePlanSchemaError,
      data: error.details,
    });
  } else {
    const agencyId = Number(req?.user?.userId);
    const planId = Number(req.params.id);
    const result = await agencyService.updateTourPlan(planId, {
      ...req.body,
      agencyId,
    });

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: agencyControllerMsg.updatePlanSuccess,
      data: result,
    });
  }
});

const getPlanDetails = catchAsync(async (req: Request, res: Response) => {
  const agencyId = Number(req?.user?.userId);
  const planId = Number(req.params.id);
  const result = await agencyService.getPlanDetails(planId, agencyId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: agencyControllerMsg.planDetailsSuccess,
    data: result,
  });
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
    message: agencyControllerMsg.upcomingSchedulesSuccess,
    data: result,
  });
});

const getAllPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
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
    message: agencyControllerMsg.plansSuccess,
    data: result,
  });
});

const manageSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const status = req.query.status as 'confirmed' | 'rejected';
  const agencyId = Number(req.user?.userId);
  if (status == 'confirmed' || status !== 'rejected') {
    const result = await agencyService.manageSchedule(id, agencyId, status);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: agencyControllerMsg.manageScheduleSuccess,
      data: result,
    });
  } else {
    throw new ApiError(
      StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      agencyControllerMsg.manageScheduleError
    );
  }
});

const agencyStatics = catchAsync(async (req: Request, res: Response) => {
  const agencyId = Number(req.user?.userId);
  const result = await agencyService.agencyStatics(agencyId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: agencyControllerMsg.staticsSuccess,
    data: result,
  });
});

const getPayouts = catchAsync(async (req: Request, res: Response) => {
  const agencyId = Number(req.user?.userId);
  const paginationOptions = pagination(req.query);
  const status = req.query.status as
    | 'pending'
    | 'released'
    | 'postponed'
    | undefined;
  if (payoutsFilter.includes(status as string) || status == undefined) {
    const result = await agencyService.getPayouts(
      agencyId,
      paginationOptions,
      status
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: agencyControllerMsg.staticsSuccess,
      data: result,
    });
  } else {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      agencyControllerMsg.payoutsFilterError
    );
  }
});

export const agencyController = {
  createTourPlan,
  getUpcomingSchedules,
  getAllPlans,
  updateTourPlan,
  getPlanDetails,
  manageSchedule,
  agencyStatics,
  getPayouts,
};
