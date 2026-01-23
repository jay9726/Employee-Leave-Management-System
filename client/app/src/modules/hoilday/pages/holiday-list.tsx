import { useState } from 'react';
import { Calendar, CalendarDays, Plus, Loader, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCompanyHolidaysAPI } from '@/services/companyholiday';
import { setCompanyHolidays } from '@/redux/slice/companyholidaySlice';
import { useDispatch, useSelector } from 'react-redux';
import { authHook } from '@/store/authStore';
import InputComponent from '@/components/input-component';
import EmployeeListTable from '../components/employee-list-table';


const CompanyHolidayList = () => {

  const { user } = authHook();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const { isPending } = useQuery({
    queryKey: ['holidays'],
    queryFn: async () => getAllCompanyHolidaysAPI()
      .then((res) => {
        dispatch(setCompanyHolidays(res.data.data));
      })
  });

  const holidays = useSelector((state: any) => state.companyHoliday.companyHoliday);

  const filteredHolidays = holidays.filter((holiday: any) =>
    holiday.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full max-h-screen py-2 px-4">
        <div className="max-w-7xl flex flex-col gap-5 max-h-screen mx-auto">

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Holiday Management
                </h1>
                <p className="text-gray-600 text-sm mt-1">Manage and organize company holidays</p>
              </div>
            </div>

            <div className="w-1/3">
              <InputComponent
                placeholder="Search holidays by name..."
                wrapperclassName="w-full"
                leftIcon={<Search className="w-4 h-4" stroke='gray' />}
                onChange={setSearchQuery}
                value={searchQuery}
              />
            </div>
          </div>


          <div className="max-h-screen flex flex-col rounded-2xl overflow-hidden">

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-white" />
                <h3 className="text-xl font-semibold text-white">
                  All Holidays
                </h3>
                <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {filteredHolidays.length} Total
                </span>
              </div>
              {
                user?.role === 'Admin' && (
                  <NavLink
                    to="/home/holiday/add"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Holiday
                  </NavLink>
                )
              }
            </div>

            <EmployeeListTable filteredHolidays={filteredHolidays} user={user} />

          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyHolidayList;