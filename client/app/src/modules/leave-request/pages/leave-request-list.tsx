import ApplyLeaveRequestForm from "../components/apply-leave-request-form";
import { authHook } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import LeaveRequestHistoryTable from "../components/leave-request-history-table";
import { useEffect } from "react";
import Icon from "../../../components/icon";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getLeaveRequestByUserIdAPI } from "@/services/leaveRequestService";
import { setLeaveRequests } from "@/redux/slice/leaverequestSlice";

export const statusStyles: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Canceled: "bg-gray-200 text-gray-700",
};

const LeaveRequestList = () => {

    const { user } = authHook();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useQuery({
        queryKey: ['employeesbyid'],
        queryFn: () => getLeaveRequestByUserIdAPI(Number(user?.id))
            .then((res) => {
                dispatch(setLeaveRequests(res.data.data))
            })
    })

    useEffect(() => {
        if (!user || user.role === 'Admin') {
            navigate(-1);
        }
    }, [user])


    const leaveRequest = useSelector((state: any) => state.leaveRequest.leaveRequest);

    useEffect(() => {
        if (!user || user.role === 'Admin') {
            navigate(-1);
        }
    }, [user, navigate]);


    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-green-50 to-emerald-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Leave Management
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">Request and track your leave applications</p>
                        </div>
                    </div>
                </div>

                <ApplyLeaveRequestForm />

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-linear-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Icon name="Clock" width={22} height={22} stroke="white" />
                            <h4 className="text-xl font-semibold text-white">
                                Leave History
                            </h4>
                            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                                {leaveRequest?.length} Requests
                            </span>
                        </div>
                    </div>

                    <LeaveRequestHistoryTable leaverequest={leaveRequest} />

                </div>
            </div>
        </div>
    );
};

export default LeaveRequestList;
