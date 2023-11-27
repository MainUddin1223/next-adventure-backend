"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payoutsFilter = exports.upcomingSchedulesFilters = exports.agencyServiceMsg = exports.agencyControllerMsg = void 0;
exports.agencyControllerMsg = {
    createPlanSuccess: 'Plan created successfully',
    updatePlanSuccess: 'Plan updated successfully',
    updatePlanSchemaError: 'Failed to update plan',
    createPlanSchemaError: 'Fail to create plan',
    upcomingSchedulesSuccess: 'Upcoming schedules retrieved successfully',
    plansSuccess: 'Plans retrieved successfully',
    planDetailsSuccess: 'Plan details retrieved successfully',
    staticsSuccess: 'Statics retrieved successfully',
    manageScheduleSuccess: 'Schedule updated successfully',
    manageScheduleError: 'Invalid status',
    payoutsFilterError: 'Invalid status',
};
exports.agencyServiceMsg = {
    updatePlanError: 'Deadline is over.You can not update this plan',
    deadlineExpireScheduleError: 'Deadline is over.You can not update this schedule',
    invalidStatusError: 'You can not change the status of this schedule',
};
exports.upcomingSchedulesFilters = ['search'];
exports.payoutsFilter = ['pending', 'released', 'postponed'];
