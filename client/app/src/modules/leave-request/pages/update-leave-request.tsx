import { useState } from "react";
import UpdateLeaveRequestForm from "../components/update-leave-request-form";
import Icon from "../../../components/icon";
import { Loader } from "lucide-react";
import UpdateLeaveRequestListTable from "../components/update-leave-request-list-table";
import { useGetAllLeaveRequests } from "../apis/queries";

const UpdateLeaveRequest = () => {


  const { data, isPending } = useGetAllLeaveRequests();

  const getContent = () => {
    if (isPending) {
      return (<Loader />)
    } else if (data?.data?.length > 0) {
      return (
        <UpdateLeaveRequestListTable data={data} />
      )
    }
  }

  return (
    <>
      {isPending && <Loader />}
      <div className="max-h-screen bg-linear-to-br from-gray-50 via-purple-50 to-indigo-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Icon name="ShieldCheck" width={27} height={27} stroke="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Leave Management
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">Admin Panel - Review and approve leave requests</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg shadow-md border border-gray-100">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Role</span>
                <p className="text-sm font-semibold text-purple-600">Administrator</p>
              </div>
            </div>
          </div>

          {getContent()}
        </div>
      </div>
    </>
  );
};

export default UpdateLeaveRequest;
