"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceMessage = exports.userControllerMsg = exports.tourPlanFilterOptions = exports.agenciesSearchOptions = void 0;
exports.agenciesSearchOptions = ['search'];
exports.tourPlanFilterOptions = ['search', 'min_price', 'max_price'];
exports.userControllerMsg = {
    agenciesSuccess: 'Agencies retrieved successfully',
    plansSuccess: 'Tour Plans retrieved successfully',
    agencyDataSuccess: 'Agency data retrieved successfully',
    planDetailsSuccess: 'Plan data retrieved successfully',
    reviewSuccess: 'Your feedback submitted successfully',
    reviewError: 'Failed to submit your feedback',
    landingPageSuccess: 'Data fetched successfully',
    bookPlanSuccess: 'Plan booked successfully',
    bookPlanError: 'Failed to book the plan',
    planReviewSuccess: 'Your review submitted successfully',
    planReviewError: 'Failed to submit your review',
    upcomingSchedulesSuccess: 'Upcoming schedules fetched successfully',
    bookingsSuccess: 'Bookings data retrieved successfully',
    scheduleUpdateSuccess: 'Schedule updated successfully',
};
exports.userServiceMessage = {
    invalidPlan: 'Requested plan is expired',
    seatsUnavailable: 'Seats unavailable',
    alreadyReviewedPlan: 'You have already reviewed the plan',
    invalidPlanReview: 'You did not book the plan',
    yetToExperience: 'Plan yet to be experienced',
    notConfirmed: 'Your booking was not confirmed',
};
