import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { agencyService } from './agency.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { agencyControllerMsg } from './agency.constant';

const createTourPlan = catchAsync(async (req: Request, res: Response) => {
  const agencyId = req?.user?.agencyId;
  const result = await agencyService.createTourPlan({ ...req.body, agencyId });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: agencyControllerMsg.createPlanSuccess,
    data: result,
  });
});
export const agencyController = { createTourPlan };
