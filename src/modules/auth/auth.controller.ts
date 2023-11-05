import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { agencyRegisterSchema, signUpSchema } from './auth.validation';
import { authResponseMessage } from './auth.constant';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message || authResponseMessage.signUpFailed,
      data: error.details,
    });
  } else {
    const result = await authService.signUp(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: authResponseMessage.signUpSuccessful,
      data: result,
    });
  }
});

const registerAgency = catchAsync(async (req: Request, res: Response) => {
  const { error } = await agencyRegisterSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message:
        error.details[0]?.message || authResponseMessage.agencyRegisterFailed,
      data: error.details,
    });
  } else {
    const result = await authService.registerAgency(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: authResponseMessage.agencyRegisterSuccessful,
      data: result,
    });
  }
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: error.details[0]?.message,
      data: error.details,
    });
  } else {
    const result = await authService.login(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: authResponseMessage.loginSuccessful,
      data: result,
    });
  }
});

const getProfileData = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userId, role } = req.user;
  const result = await authService.getProfile(userId, role);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: authResponseMessage.profileDataMsg,
    data: result,
  });
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { authId } = req.user;
  const result = await authService.deleteAccount(authId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: authResponseMessage.accountDeleteMsg,
    data: result,
  });
});

export const authController = {
  signUp,
  registerAgency,
  login,
  getProfileData,
  deleteAccount,
};
