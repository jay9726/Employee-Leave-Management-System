import { NavLink } from "react-router-dom";
import Icon from "../../../../components/icon";


interface departmentListTableProps {
    data: any[];
    user: any;
    handleDelete: (id: number) => void;
}

const DepartmentListTable: React.FC<departmentListTableProps> = ({ data, user, handleDelete }) => {
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
                        {user?.role === "Admin" && (
                            <th className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="action" width={16} height={16} stroke="black" />
                                    Actions
                                </div>
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data?.length === 0 ? (
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
                        data?.map((department: any, index: number) => (
                            <tr
                                key={index}
                                className="hover:bg-blue-50/50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                                            <span className="text-sm font-bold text-blue-600">
                                                {department.id}
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
                                {user?.role === "Admin" && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <NavLink
                                                to={`/home/department/update/${department.id}`}
                                                className="bg-blue-200 px-2 py-2 rounded-lg">
                                                <Icon name="EditBadge" width={18} height={18} stroke="blue" />
                                            </NavLink>

                                            <button
                                                onClick={() => handleDelete(department.id)}
                                                className="bg-red-200 px-2 py-2 rounded-lg">
                                                <Icon name="Trash" width={18} height={18} stroke="red" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DepartmentListTable