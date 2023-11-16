import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { adminService } from './admin.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { pagination } from '../../utils/helpers/pagination';
import { AdminControllerMsg, getUsersFilterOptions } from './admin.constant';
import pick from '../../utils/helpers/pick';
import ApiError from '../../utils/errorHandlers/apiError';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getUsersOrAdmins(
    paginationOptions,
    filter,
    'user'
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.getUsersSuccess,
    data: result,
  });
});

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getUsersOrAdmins(
    paginationOptions,
    filter,
    'admin'
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.getAdminsSuccess,
    data: result,
  });
});

const getAgencies = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getAgencies(paginationOptions, filter);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.getAgenciesSuccess,
    data: result,
  });
});

const getAgencyDetailsById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.getAgencyDetailsById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.agencyDetailsSuccess,
    data: result,
  });
});

const getUpcomingSchedules = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.upcomingSchedules(
    paginationOptions,
    filter
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.upcomingSchedulesSuccess,
    data: result,
  });
});

const getAllPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getAllPlans(paginationOptions, filter);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.allPlansSuccess,
    data: result,
  });
});

const getPlanDetailsById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.getPlanDetailsById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.planDetailsSuccess,
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pagination(req.query);
  const filter = pick(req.query, getUsersFilterOptions);
  const result = await adminService.getBookings(paginationOptions, filter);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.bookingsSuccess,
    data: result,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.getBookingById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.bookingDetailsSuccess,
    data: result,
  });
});

const manageSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const status = req.query.status;
  if (status == 'pending' || status === 'postponded') {
    const result = await adminService.manageSchedule(id, status);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: AdminControllerMsg.manageBookingSuccess,
      data: result,
    });
  } else {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid status');
  }
});

const releasePayoutByPlan = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.releasePayoutByPlan(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: AdminControllerMsg.manageBookingSuccess,
    data: result,
  });
});

const releasePayoutByBooking = catchAsync(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const status = req.query.status;
    if (status == 'released' || status === 'postponded') {
      const result = await adminService.managePayout(id, status);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: AdminControllerMsg.manageBookingSuccess,
        data: result,
      });
    } else {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid status');
    }
  }
);

export const AdminController = {
  getUsers,
  getAdmins,
  getAgencies,
  getAgencyDetailsById,
  getUpcomingSchedules,
  getAllPlans,
  getPlanDetailsById,
  getBookings,
  getBookingById,
  manageSchedule,
  releasePayoutByPlan,
  releasePayoutByBooking,
};
