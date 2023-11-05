import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { agencyRegisterSchema, signUpSchema } from './auth.validation';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message || 'Sign up failed',
      data: error.details,
    });
  } else {
    const result = await authService.signUp(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Signup successful',
      data: result,
    });
  }
});

const registerAgency = catchAsync(async (req: Request, res: Response) => {
  const { error } = await agencyRegisterSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message || 'Sign up failed',
      data: error.details,
    });
  } else {
    const result = await authService.registerAgency(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Agency registered successfully',
      data: result,
    });
  }
});

export const authController = { signUp, registerAgency };
