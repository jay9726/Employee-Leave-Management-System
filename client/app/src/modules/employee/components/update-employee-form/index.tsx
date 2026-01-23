import Icon from '@/components/icon';
import InputComponent from '@/components/input-component';
import { useToast } from '@/hooks/toast';
import { registerDefaultValues } from '@/modules/auth/schemas/authDefaultValues';
import { registerSchema, type UpdateProfilePayload } from '@/modules/auth/schemas/authSchema';
import {  getOnlyDepartmentAPI } from '@/services/departmentService';
import { updateUserAPI } from '@/services/userService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';


interface updateemployeeFormProps {
    user: any
}

const UpdateEmployeeForm: React.FC<updateemployeeFormProps> = ({ user }) => {

    const toast = useToast();
    const navigate = useNavigate();
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['departments'],
        queryFn: getOnlyDepartmentAPI,
        enabled: !!id
    })

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: registerDefaultValues
    })

    useEffect(() => {
        if (!user) return;

        reset({
            FullName: user.fullName,
            Email: user.email,
            DepartmentId: user.departmentId
        });
    }, [user, reset]);


    const updateMutation = useMutation({
        mutationFn: (data: UpdateProfilePayload) => updateUserAPI(data),
        onSuccess: (data) => {
            if (data.status === 200) {
                toast.success("Employee Updated Successfully");
                navigate('/home/employee');
            } else {
                toast.error("Employee Update Failed Please Try Again.");
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            console.log(error);
        }
    })

    const onSubmit = async (data: UpdateProfilePayload) => {
        data.ApplicationId = Number(id);
        try {
            updateMutation.mutate(data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            {updateMutation.isPending && <Loader />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Uplod Image</label>
                        <div className="flex flex-col">
                            <div>
                                <Controller
                                    name="ImagePath"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                            className="w-full pl-5 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        />
                                    )}
                                />
                                {errors.ImagePath && (
                                    <small className="text-red-500 text-sm  flex items-center gap-1">
                                        <Icon name="X" width={20} height={20} stroke="red" />
                                        {errors.ImagePath.message}
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <Controller
                            name="FullName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <InputComponent
                                    {...field}
                                    placeholder="Enter Your Full Name"
                                    wrapperclassName="w-full"
                                    error={fieldState.error?.message}
                                    leftIcon={<Icon name="UserRound" width={16} height={16} stroke="blue" />}
                                    disable
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 ">Email</label>
                        <Controller
                            name="Email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <InputComponent
                                    {...field}
                                    placeholder="Enter Your Email"
                                    wrapperclassName="w-full"
                                    error={fieldState.error?.message}
                                    leftIcon={<Icon name="Mail" width={16} height={16} stroke="blue" />}
                                    disable
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <Icon name="Building" width={20} height={20} stroke="blue" />
                                </div>
                                <Controller
                                    name="DepartmentId"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <select
                                                {...field}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            >
                                                <option value="">Select Department</option>
                                                {
                                                    data?.data.data.map((department: any, index: number) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={department.id}
                                                            >
                                                                {department.departmentName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <Icon name="dropdown" width={25} height={25} strokeWidth={2} stroke="gray" />
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {errors.DepartmentId && (
                                <small className="text-red-500 text-sm flex items-center gap-1">
                                    <Icon name="X" width={20} height={20} stroke="red" />
                                    {errors.DepartmentId.message}
                                </small>
                            )}
                        </div>
                    </div>
                    <button
                        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {updateMutation.isPending ? "Updating Account..." : "Update Account"}
                        <Icon name="ArrowRight" width={20} height={20} />
                    </button>
                </div>
            </form>
        </>
    )
}

export default UpdateEmployeeForm