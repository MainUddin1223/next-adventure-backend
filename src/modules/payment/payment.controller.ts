import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { paymentService } from './payment.service';

const payment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.initPayment();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

export const paymentController = { payment };
