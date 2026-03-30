import { formatDate } from '@/constant/constant'
import { Calendar, CalendarDays, Loader, MapPin } from 'lucide-react'
import React from 'react'
import { useGetAllCompanyHolidays } from '../apis/queries';

const EmployeeHolidays: React.FC = () => {

    const { data, isPending } = useGetAllCompanyHolidays();


    const getContent = () => {
        if (isPending) {
            return (<Loader />)
        } else if (data?.data?.length > 0) {
            return (
                data?.data.map((holiday: any) => (
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
                    </tr>
                ))
            )
        }
    }

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
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.data?.length === 0 ? (
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
                        getContent()
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeHolidays