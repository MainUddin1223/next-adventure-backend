import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.signUp(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Signup successful',
    data: result,
  });
});

export const authController = { signUp };
