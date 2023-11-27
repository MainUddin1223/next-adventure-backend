'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.adminServiceMsg =
  exports.AdminControllerMsg =
  exports.getUsersFilterOptions =
    void 0;
exports.getUsersFilterOptions = ['search'];
exports.AdminControllerMsg = {
  getUsersSuccess: 'Users retrieved successfully',
  getAdminsSuccess: 'Admins retrieved successfully',
  getAgenciesSuccess: 'Agencies retrieved successfully',
  upcomingSchedulesSuccess: 'Upcoming schedules retrieved successfully',
  allPlansSuccess: 'Plans retrieved successfully',
  bookingsSuccess: 'Bookings retrieved successfully',
  agencyDetailsSuccess: 'Agency details retrieved successfully',
  planDetailsSuccess: 'Plan details retrieved successfully',
  bookingDetailsSuccess: 'Booking details retrieved successfully',
  manageBookingSuccess: 'Booking status updated successfully',
};
exports.adminServiceMsg = {
  bookingNotFound: 'Booking not found',
  bookingDeadlineError: 'Booking Deadline is over',
  notChangeableError: 'User already canceled the booking',
  sameStatusError: 'Booking status already in pending',
  invalidStatus: 'You can not change the status into pending',
};
