import Icon from '@/components/icon';
import InputComponent from '@/components/input-component';
import { useToast } from '@/hooks/toast';
import { updateProfileDefaultValues } from '@/modules/auth/schemas/authDefaultValues';
import { updateProfileSchema, type UpdateProfilePayload } from '@/modules/auth/schemas/authSchema';
import { updateUserAPI } from '@/services/userService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';


interface updateProfileFormProps {
    user: any;
    onClose: () => void;
}

const UpdateProfileForm: React.FC<updateProfileFormProps> = ({ user, onClose }) => {

    const toast = useToast();

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: updateProfileDefaultValues
    })

    useEffect(() => {
        if (user) {
            reset({
                FullName: user.fullName,
                Email: user.email,
            });
        }
    }, [user, reset])

    const updateProfileMutation = useMutation({
        mutationFn: (data: UpdateProfilePayload) => updateUserAPI(data),
        onSuccess: (res) => {
            if (res.status === 200) {
                const updateStorage = JSON.parse(localStorage.getItem("ELMS") || '{}');
                updateStorage.departmentId = res.data.departmentId
                updateStorage.email = res.data.email
                updateStorage.expiresAt = updateStorage.expiresAt
                updateStorage.fullName = res.data.fullName
                updateStorage.id = res.data.applicationId
                updateStorage.role = updateStorage.role
                updateStorage.token = updateStorage.token
                updateStorage.imagePath = res.data.imagePath
                localStorage.setItem("ELMS", JSON.stringify(updateStorage))

                toast.success("Employee Updated Successfully");
                onClose();
                window.location.reload();
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
        data.ApplicationId = user.applicationId;
        data.DepartmentId = user.departmentId
        try {
            updateProfileMutation.mutate(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {updateProfileMutation.isPending && <Loader />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Select Profile Image</label>
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                </div>
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
                                />
                            )}
                        />
                    </div>
                    <div className='flex gap-8'>
                        <button
                            type='submit'
                            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                            {updateProfileMutation.isPending ? "Updating Account..." : "Update Account"}
                            <Icon name="ArrowRight" width={20} height={20} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </form >
            <button
                className="w-full bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                onClick={onClose}
            >
                <Icon name="X" width={20} height={20} strokeWidth={3} />
                Cancel
            </button>
        </>
    )
}



export default UpdateProfileForm