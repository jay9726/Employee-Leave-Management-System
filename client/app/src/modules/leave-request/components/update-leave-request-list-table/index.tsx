import Icon from '@/components/icon'
import { getLeaveRequestByUserIdAPI } from '@/services/leaveRequestService';
import React from 'react'
import { statusStyles } from '../../pages/leave-request-list';

interface updateLeaveRequestListTableProps{
    data: any;
    setAppAndLeaveId: any;
    setLeave: any;
    setOpenModal: any;
}

const UpdateLeaveRequestListTable: React.FC<updateLeaveRequestListTableProps> = ({ data, setAppAndLeaveId, setLeave, setOpenModal }) => {

    const handleEditClick = async (l: any) => {
        setAppAndLeaveId({
            leaveRequestId: l.leaveRequestId,
            reviewedById: l.applicationId,
        });

        const res = await getLeaveRequestByUserIdAPI(l.applicationId);
        setLeave(res.data.data);
        setOpenModal(true);
    };


    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Icon name="Notebook" width={24} height={24} stroke="white" />
                    <h3 className="text-xl font-semibold text-white">
                        Pending Leave Requests
                    </h3>
                    <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {data?.data.data.length} Total
                    </span>
                </div>
                <div className="flex items-center gap-2 text-white text-sm">
                    <Icon name="Clock" width={16} height={16} stroke="white" />
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                    <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="UserRound" width={16} height={16} stroke="black" />
                                    Employee
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="Notebook" width={16} height={16} stroke="black" />
                                    LeaveType
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="Building" width={16} height={16} stroke="black" />
                                    Department
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="Calendar" width={16} height={16} stroke="black" />
                                    From
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="Calendar" width={16} height={16} stroke="black" />
                                    To
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="comment" width={16} height={16} stroke="black" />
                                    Reason
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="CircleCheck" width={16} height={16} stroke="black" />
                                    Status
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                                    <Icon name="action" width={16} height={16} stroke="black" />
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {data?.data.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Icon name="Info" width={32} height={32} stroke="gray" />
                                        </div>
                                        <p className="text-gray-500 font-medium">No leave requests found</p>
                                        <p className="text-gray-400 text-sm">All leave requests have been processed</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data?.data.data.map((request: any, index: number) => (
                                <tr key={index} className="hover:bg-purple-50/50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{request.userName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 text-sm">{request.leaveType ? request.leaveType : 'Null'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 text-sm">{request.departmentName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 text-sm">
                                            {new Date(request.fromDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 text-sm">
                                            {new Date(request.toDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600 text-sm max-w-xs truncate" title={request.reason}>
                                            {request.reason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[request.status]}`}>
                                            {request.status === 'Approved' && (
                                                <Icon name="CircleCheck" width={14} height={14} stroke="green" />
                                            )}
                                            {request.status === 'Pending' && (
                                                <Icon name="Clock" width={14} height={14} stroke="#FFAA00" />
                                            )}
                                            {request.status === 'Rejected' && (
                                                <Icon name="CircleCheck" width={14} height={14} stroke="red" />
                                            )}
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {
                                            request.status !== 'Canceled' && <button
                                                onClick={() => handleEditClick(request)}
                                                className="bg-purple-200 px-2 py-2 rounded-lg"
                                            >
                                                <Icon name="EditBadge" width={18} height={18} stroke="purple" />
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpdateLeaveRequestListTable