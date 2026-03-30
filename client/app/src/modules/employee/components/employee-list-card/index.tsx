import Icon from '@/components/icon';
import { useToast } from '@/hooks/toast';
import { deleteEmployee } from '@/redux/slice/employeeSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDeleteUser } from '../../apis/mutation';

interface EmployeeListCardProps {
    user: any;
}

const EmployeeListCard: React.FC<EmployeeListCardProps> = ({ user }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const { mutate, isPending } = useDeleteUser();

    const handleDelete = (userId: string) => {
        console.log("id", userId)
        if (window.confirm('Are you sure you want to delete this user?')) {
            mutate(userId, {
                onSuccess: (res) => {
                    if (res.data.code === 400) {
                        toast.warning(res.data.message);
                    } else if (res.data.code === 200) {
                        dispatch(deleteEmployee(res.data.applicationId))
                        toast.success('User deleted successfully');
                    }
                },
                onError: (res: any) => {
                    toast.error('Something went wrong');
                }
            });
        }
    };

    return (
        <div
            key={user.userId}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={`https://localhost:7287${user?.imagePath}`}
                    alt={user.fullName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

                />
            </div>

            <div className="flex flex-col gap-3 px-5 py-2">
                <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors capitalize">
                    {user.fullName}
                </h3>

                <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Mail" width={16} height={16} stroke="currentColor" />
                    <p className="text-sm truncate hover:text-indigo-600 transition-colors">{user.email}</p>
                </div>

                <div className='flex gap-2'>
                    <Icon name="Building" width={16} height={16} stroke="indigo" />
                    <span className="text-sm font-semibold text-indigo-700">
                        {user.departmentName || 'Unassigned'}
                    </span>
                </div>

                <div className="flex justify-end gap-3">
                    <NavLink to={`/admin/employee/update/${user.employeeId}`}>
                        <button className="w-auto bg-blue-100 px-2 py-2 rounded-lg">
                            <Icon name="EditBadge" width={22} height={22} stroke="blue" />
                        </button>
                    </NavLink>

                    <button
                        onClick={() => handleDelete(user.employeeId)}
                        className="w-auto bg-red-100 px-2 py-2 rounded-lg"
                    >
                        <Icon name="Trash" width={22} height={22} stroke="red" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeListCard