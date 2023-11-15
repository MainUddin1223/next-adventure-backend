import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { adminService } from './admin.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../utils/helpers/pagination';
import { AdminControllerMsg, getUsersFilterOptions } from './admin.constant';
import pick from '../../utils/helpers/pick';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getUsers(paginationOptions, filter);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.getUsersSuccess,
    data: result,
  });
});

export const AdminController = { getUsers };
