import React from 'react'
import { statusStyles } from '../../pages/leave-request-list'
import Icon from '../../../../components/icon'
import { useMutation } from '@tanstack/react-query';
import { cancelLeaveAPI } from '@/services/leaveRequestService';
import { useToast } from '@/hooks/toast';
import { useDispatch } from 'react-redux';
import { updateLeaveReqeust } from '@/redux/slice/leaverequestSlice';

interface leaveRequestHistoryTableProps {
    leaverequest: any[];
}

const LeaveRequestHistoryTable: React.FC<leaveRequestHistoryTableProps> = ({ leaverequest }) => {

    const toast = useToast();
    const dispatch = useDispatch();

    const cancelLeaveRequestsMutation = useMutation({
        mutationFn: async (requestId: number) => cancelLeaveAPI(requestId)
        .then((res:any) => {
            dispatch(updateLeaveReqeust(res.data.data));
            toast.success('Leave request canceled successfully');
        }).catch((error:any) => {
            toast.error('Failed to cancel leave request');
            console.log(error);
        })
    });

    const handleRequestCancel = (requestId: number) => {
        try {
            if (window.confirm('Are you sure you want to cancel this leave request?')) {
                cancelLeaveRequestsMutation.mutate(requestId);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Icon name="Notebook" width={16} height={16} stroke="black" />
                                Reason
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Icon name="Notebook" width={16} height={16} stroke="black" />
                                LeaveType
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
                                <Icon name="CircleCheck" width={16} height={16} stroke="black" />
                                Status
                            </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Icon name="comment" width={16} height={16} stroke="black" />
                                Admin Comment
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
                    {leaverequest.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Icon name="Notebook" width={32} height={32} stroke="gray" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No leave requests found</p>
                                    <p className="text-gray-400 text-sm">Apply for leave to see your history</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        leaverequest.map((request: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 font-medium">{request.reason}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 font-medium">{request.leaveType ? request.leaveType : 'Null'}</div>
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
                                <td className="px-6 py-4">
                                    <div className="text-gray-600 text-sm">
                                        {request.adminComment || (
                                            <span className="text-gray-400 italic">No comment</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {
                                        request.status === 'Pending' && <button
                                            className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium text-sm hover:underline transition-colors"
                                            onClick={() => handleRequestCancel(request.leaveRequestId)}
                                        >
                                            <Icon name="X" width={16} height={16} stroke="red" />
                                            Cancel
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LeaveRequestHistoryTable