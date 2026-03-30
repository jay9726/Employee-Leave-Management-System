import { configureStore } from '@reduxjs/toolkit';
import department from './slice/departmentSlice';
import leaveRequest from './slice/leaverequestSlice';
import companyHoliday from './slice/companyholidaySlice';
import employee from './slice/employeeSlice';
import pagination  from './slice/paginationSlice';
import auth from './slice/authSlice'

export const store = configureStore({
  reducer: {
    auth : auth,
    department: department,
    leaveRequest : leaveRequest,
    companyHoliday : companyHoliday,
    employee : employee,
    pagination: pagination
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;