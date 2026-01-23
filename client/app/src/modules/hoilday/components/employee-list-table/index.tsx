import Icon from '@/components/icon'
import { formatDate } from '@/constant/constant';
import { deleteCompanyHolidayAPI } from '@/services/companyholiday';
import { useMutation } from '@tanstack/react-query';
import { Calendar, CalendarDays, MapPin } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom'


interface EmployeeListTableProps {
    filteredHolidays: any[];
    user: any;
}


const EmployeeListTable: React.FC<EmployeeListTableProps> = ({ filteredHolidays, user }) => {

    const deleteholidaymutation = useMutation({
        mutationFn: (id: number) => deleteCompanyHolidayAPI(id)
            .then(() => {
                window.location.reload();
            })
    })

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this holiday?')) {
            deleteholidaymutation.mutate(id);
        }
    };

    return (
        <div className="overflow-x-auto max-h-96">
            <table className="w-full">
                <thead className="sticky top-0">
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Calendar className="w-4 h-4" />
                                Date
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <CalendarDays className="w-4 h-4" />
                                Day
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <MapPin className="w-4 h-4" />
                                Holiday Name
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Calendar className="w-4 h-4" />
                                Type
                            </div>
                        </th>
                        {
                            user?.role === 'Admin' && (
                                <th className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                                        Actions
                                    </div>
                                </th>
                            )
                        }
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredHolidays.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No holidays found</p>
                                    <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredHolidays.map((holiday: any) => (
                            <tr
                                key={holiday.id}
                                className="hover:bg-blue-50/50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-gray-900">
                                            {formatDate(holiday.date)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600 text-sm capitalize">
                                        {holiday.day}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {holiday.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center text-sm font-bold capitalize ${holiday.holidayType === 'Regular'
                                        ? ' text-green-700'
                                        : ' text-purple-700'
                                        }`}>
                                        {holiday.holidayType}
                                    </span>
                                </td>
                                {
                                    user?.role === 'Admin' && (
                                        <td>
                                            <div className="flex items-center justify-center  py-2 gap-2">
                                                <NavLink
                                                    to={`/home/holiday/update/${holiday.id}`}
                                                    className="bg-blue-200 px-2 py-2 rounded-lg"
                                                >
                                                    <Icon name="EditBadge" width={18} height={18} stroke='blue' />
                                                </NavLink>

                                                <button
                                                    onClick={() => handleDelete(holiday.id)}
                                                    className="bg-red-200 px-2 py-2 rounded-lg"
                                                >
                                                    <Icon name="Trash" width={18} height={18} stroke='red' />
                                                </button>
                                            </div>
                                        </td>)
                                }
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeListTable