import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';


export type Holiday = {
  id: number,
  date: string,
  day: string,
  name: string,
  holidayType: string
}

interface CompanyHolidayState {
    companyHoliday: Holiday[];
}

const initialState : CompanyHolidayState = {
  companyHoliday: [],
};


const companyholidaySlice = createSlice({
  name: 'companyholiday',
  initialState,
    reducers: {
    setCompanyHolidays(state, action: PayloadAction<Holiday[]>) {
        state.companyHoliday = action.payload;
    },
    addCompanyHoliday(state, action: PayloadAction<Holiday>) {
      state.companyHoliday.push(action.payload);
    },
    updateCompanyHoliday(state, action: PayloadAction<Holiday>) {
      const index = state.companyHoliday.findIndex(holiid => holiid.id === action.payload.id);
        if (index !== -1) {
          state.companyHoliday[index] = action.payload;
        }
    },  
    removeCompanyHoliday(state, action: PayloadAction<number>) {
      state.companyHoliday = state.companyHoliday.filter(holiid => holiid.id !== action.payload);
    },
  },
});

export const { setCompanyHolidays, addCompanyHoliday, updateCompanyHoliday, removeCompanyHoliday} = companyholidaySlice.actions;
export default companyholidaySlice.reducer;