import Icon from '@/components/icon'
import React from 'react'
import { useGetAllDepartments } from '../apis/queries';
import Loader from '@/components/loader';

const EmployeeDepartment: React.FC = () => {

    const { data, isPending } = useGetAllDepartments();

    const getContent = () => {
        if (isPending) {
            return (<Loader />)
        } else if (data?.data.length > 0) {
            return (
                data?.data.map((department: any, index: number) => (
                    <tr
                        key={index}
                        className="hover:bg-blue-50/50 transition-colors duration-200"
                    >
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600">
                                        {index + 1}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                                {department.departmentName}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-gray-600 text-sm">
                                {department.description}
                            </div>
                        </td>
                    </tr>
                ))
            )
        }
    }

    console.log(data);

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-black">
                                <Icon name="Hash" width={16} height={16} stroke="black" />
                                ID
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-black">
                                <Icon name="Building" width={16} height={16} stroke="black" />
                                Department Name
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-black">
                                <Icon name="TextAlignJustify" width={16} height={16} stroke="black" />
                                Description
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data?.data.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Icon name="Info" width={25} height={25} stroke="gray" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No departments found</p>
                                    <p className="text-gray-400 text-sm">Add a new department to get started</p>
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

export default EmployeeDepartment