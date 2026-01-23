import { useToast } from "@/hooks/toast";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordPayload } from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordDefaultValues } from "../../schemas/authDefaultValues";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "@/services/forgetPasswordService";
import Loader from "@/components/loader";
import Icon from "@/components/icon";
import InputComponent from "@/components/input-component";




interface resetPasswordFormProps {
    email: string;
    token: string;
}

const ResetPasswordForm: React.FC<resetPasswordFormProps> = ({ email, token }) => {

    const toast = useToast();
    const navigate = useNavigate();

    const { handleSubmit, control, reset} = useForm<ResetPasswordPayload>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: resetPasswordDefaultValues
    });

    useEffect(() => {
        reset({
            Email: email,
            Token: token,
            NewPassword: ""
        })
    }, []);

    const resetPasswordMutation = useMutation({
        mutationFn: (data: ResetPasswordPayload) => resetPasswordAPI(data),
        onSuccess: (res) => {
                if (res.status === 200) {
                    toast.success("Password Reset successfully");
                    navigate("/");
                } else {
                    toast.error("Failed to reset password. Please try again.");
                }
            },
        onError: (error) => {
            if(error instanceof Error) {
                toast.error(error.message);
            }
            console.log(error);
        }
    })


    const onSubmit = async (data: ResetPasswordPayload) => {
        data.NewPassword = data.NewPassword;
        resetPasswordMutation.mutate(data);
    };

    return (
        <>
            {resetPasswordMutation.isPending && <Loader />}
            <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        New Password
                    </label>
                    <Controller
                        name="NewPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputComponent
                                    {...field}
                                    type="password"
                                    value={field.value || ''}
                                    placeholder="Enter Your Password"
                                    wrapperclassName="w-full"
                                    togglePassword
                                    error={fieldState.error?.message}
                                    leftIcon={<Icon name="password" width={16} height={16} stroke="blue" />}
                                />
                        )}
                    />
                <div className="mb-4 bg-linear-to-r from-blue-200 to-purple-200 border-blue-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <Icon name='ShieldCheck' width={20} height={20} stroke='blue' />
                        <div>
                            <p className="text-sm font-semibold text-blue-700 mb-1">
                                Create a Strong Password
                            </p>
                            <p className="text-xs text-blue-600">
                                Use a mix of uppercase, lowercase, numbers, and special characters for better security.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full  flex items-center justify-center gap-2  bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                    {resetPasswordMutation.isPending ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>
        </>
    )
}

export default ResetPasswordForm