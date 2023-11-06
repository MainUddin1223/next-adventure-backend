import catchAsync from '../../utils/errorHandlers/catchAsync';
import { Request, Response } from 'express';
import { userService } from './user.service';
import { pagination } from '../../utils/helpers/pagination';
import {
  agenciesSearchOptions,
  tourPlanFilterOptions,
  userControllerMsg,
} from './user.constant';
import pick from '../../utils/helpers/pick';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/helpers/sendResponse';
import { bookPlanSchema, reviewSchema } from './user.validator';

const getAgencies = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, agenciesSearchOptions);
  const result = await userService.getAgencies(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: userControllerMsg.agenciesSuccess,
    data: result,
  });
});

const getTourPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, tourPlanFilterOptions);
  const result = await userService.getTourPlans(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: userControllerMsg.plansSuccess,
    data: result,
  });
});

const getAgencyById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getAgencyById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: userControllerMsg.agencyDataSuccess,
    data: result,
  });
});

const getPlanDetails = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getTourPlanById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: userControllerMsg.planDetailsSuccess,
    data: result,
  });
});

const reviewPlatform = catchAsync(async (req: Request, res: Response) => {
  const { error } = await reviewSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message || userControllerMsg.reviewError,
      data: error.details,
    });
  } else {
    const userId = Number(req.user?.userId);
    const data = req.body;
    const result = await userService.reviewPlatform({ ...data, userId });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: userControllerMsg.reviewSuccess,
      data: result,
    });
  }
});

const getLandingPageData = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getLandingPageData();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: userControllerMsg.landingPageSuccess,
    data: result,
  });
});

const bookPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await bookPlanSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message || userControllerMsg.bookPlanError,
      data: error.details,
    });
  } else {
    const planId = Number(req.params.id);
    const userId = Number(req.user?.userId);
    const seats = Number(req.body.totalSeat);
    const result = await userService.bookPlan({ planId, userId, seats });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: userControllerMsg.bookPlanSuccess,
      data: result,
    });
  }
});

export const userController = {
  getAgencies,
  getTourPlans,
  getAgencyById,
  getPlanDetails,
  reviewPlatform,
  getLandingPageData,
  bookPlan,
};
