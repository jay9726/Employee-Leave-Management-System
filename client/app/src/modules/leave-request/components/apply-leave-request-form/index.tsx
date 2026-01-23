import { zodResolver } from "@hookform/resolvers/zod";
import { leaveRequestDefaultValues } from "../../schemas/leaveRequestDefaultValues";
import { leaveRequestSchema, type LeaveRequestSchemaPayload } from "../../schemas/leaveRequestSchemas";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { applyLeaveRequestAPI } from "../../../../services/leaveRequestService";
import { authHook } from "../../../../store/authStore";
import { Loader } from "lucide-react";
import Icon from "../../../../components/icon";
import { useToast } from "@/hooks/toast";
import { useDispatch } from "react-redux";
import { addLeaveRequest } from "@/redux/slice/leaverequestSlice";
import { leaveTypes } from "@/constant/constant";
import InputComponent from "@/components/input-component";


const ApplyLeaveRequestForm = () => {

    const { user } = authHook();
    const toast = useToast();
    const dispatch = useDispatch();


    const { handleSubmit, control, reset, formState: { errors }, } = useForm<LeaveRequestSchemaPayload>({
        resolver: zodResolver(leaveRequestSchema),
        defaultValues: leaveRequestDefaultValues
    });

    const applyLeaveRequestMutation = useMutation({
        mutationFn: (data: LeaveRequestSchemaPayload) => applyLeaveRequestAPI(data)
            .then((res) => {
                if (res.status === 201) {
                    dispatch(addLeaveRequest(res.data.data));
                    toast.success("Leave request applied successfully");
                    reset();
                } else {
                    toast.error("Leave request failed to apply");
                }
            })
    })

    const onSubmit = async (data: LeaveRequestSchemaPayload) => {
        try {
            data.applicantId = user!.id;
            data.departmentId = user!.departmentId;
            applyLeaveRequestMutation.mutate(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {applyLeaveRequestMutation.isPending && <Loader />}
            <div className="w-full sticky z-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-linear-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                        <Icon name="Plus" width={20} height={20} stroke="green" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">
                        Apply for Leave
                    </h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" flex justify-between">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Reason</label>
                            <Controller
                                name="reason"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <InputComponent
                                        {...field}
                                        placeholder="Enter Your Leave Reason"
                                        wrapperclassName="w-full"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">From Date</label>
                            <Controller
                                name="fromDate"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="date"
                                        {...field}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                )}
                            />
                            {errors.fromDate && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <Icon name="X" width={16} height={16} stroke="red" />
                                    {errors.fromDate.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">To Date</label>
                            <Controller
                                name="toDate"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="date"
                                        {...field}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                )}
                            />
                            {errors.toDate && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <Icon name="X" width={16} height={16} stroke="red" />
                                    {errors.toDate.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Leave Type</label>
                            <div className="relative">
                                <Controller
                                    name="LeaveType"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div>
                                                <select
                                                    {...field}
                                                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
                                                >
                                                    <option value="">Select LeaveType</option>
                                                    {leaveTypes.map((l: any, index: number) => {
                                                        return (
                                                            <option key={index} value={l.leavetype}>{l.label}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <Icon name="dropdown" width={25} height={25} strokeWidth={2} stroke="gray" />
                                            </div>
                                        </>
                                    )}
                                />
                                {errors.LeaveType && (
                                    <small className="text-red-500 text-sm flex items-center gap-1">
                                        <Icon name="X" width={20} height={20} stroke="red" />
                                        {errors.LeaveType.message}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center py-4">
                            <button
                                className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Icon name="CircleCheck" width={18} height={18} stroke="white" />
                                {applyLeaveRequestMutation.isPending ? "Applying..." : "Apply Leave"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ApplyLeaveRequestForm;
