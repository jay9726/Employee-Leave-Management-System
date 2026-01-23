
import { useToast } from "@/hooks/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLeaveRequestSchema, type UpdateLeaveRequestPayload } from "../../schemas/leaveRequestSchemas";
import { updateLeaveRequestDefaultValues } from "../../schemas/leaveRequestDefaultValues";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateLeaveRequestAPI } from "@/services/leaveRequestService";
import Loader from "@/components/loader";
import Icon from "@/components/icon";

interface Props {
  leave: any[];
  appAndLeaveId: {
    leaveRequestId: number;
    reviewedById: number;
  };
  setOpenModal: () => void;
}

const UpdateLeaveRequestForm: React.FC<Props> = ({ leave, appAndLeaveId, setOpenModal }) => {

  const toast = useToast();

  const { handleSubmit, control, reset, formState: { errors }, } = useForm<UpdateLeaveRequestPayload>({
    resolver: zodResolver(updateLeaveRequestSchema),
    defaultValues: updateLeaveRequestDefaultValues,
  });

  useEffect(() => {
    reset(updateLeaveRequestDefaultValues);
  }, [appAndLeaveId, reset]);

  const selectedLeave = leave.find(
    (l) => l.leaveRequestId === appAndLeaveId.leaveRequestId
  );

  const updateLeaveRequestmutation = useMutation({
    mutationFn: updateLeaveRequestAPI,
    onSuccess: () => {
      window.location.reload();
      toast.success("Leave updated successfully");
      setOpenModal();
    },
  });

  const onSubmit = (data: UpdateLeaveRequestPayload) => {
    updateLeaveRequestmutation.mutate({
      ...data,
      leaveRequestId: appAndLeaveId.leaveRequestId,
      reviewedById: appAndLeaveId.reviewedById,
    });
  };

  return (
    <>
      {updateLeaveRequestmutation.isPending && <Loader />}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl transform transition-all animate-scaleIn">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Icon name="EditBadge" width={20} height={20} stroke="purple" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Review Leave Request</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Employee: {selectedLeave?.userName}</p>
                </div>
              </div>
              <button
                onClick={setOpenModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon name="X" width={20} height={20} stroke="gray" />
              </button>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border border-purple-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-medium mb-1">Department</p>
                  <p className="text-gray-900 font-semibold">{selectedLeave?.departmentName}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-1">Duration</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedLeave && new Date(selectedLeave.fromDate).toLocaleDateString()} - {selectedLeave && new Date(selectedLeave.toDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 font-medium mb-1">Reason</p>
                  <p className="text-gray-900 font-semibold">{selectedLeave?.reason}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label className="flex gap-1 text-sm font-semibold text-gray-700 mb-2">
                    Decision <p className="text-red-600">*</p>
                  </label>
                  <Controller
                    name="approve"
                    control={control}
                    render={({ field }) => (
                      <>
                        <select
                          value={String(field.value)}
                          onChange={(e) =>
                            field.onChange(e.target.value === "true")
                          }
                          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
                        >
                          <option value="">Select decision</option>
                          <option value="true">✓ Approve Leave</option>
                          <option value="false">✗ Reject Leave</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </>
                    )}
                  />
                  {errors.approve && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <Icon name="X" width={16} height={16} stroke="red" />
                      {errors.approve.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex gap-1 text-sm font-semibold text-gray-700 mb-2">
                    Admin Comment <p className="text-red-600">*</p>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-4.5">
                      <Icon name="comment" width={16} height={16} stroke="gray" />
                    </div>
                    <Controller
                      name="adminComment"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={4}
                          placeholder="Enter your comment here..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                      )}
                    />
                    {errors.adminComment && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <Icon name="X" width={16} height={16} stroke="red" />
                        {errors.adminComment.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={setOpenModal}
                      className="px-6 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                      {updateLeaveRequestmutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Icon name="CircleCheck" width={16} height={16} stroke="white" />
                          Update Status
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form >
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLeaveRequestForm;
