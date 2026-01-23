import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/toast";
import { forgotPasswordSchema, type ForgotPasswordPayload } from "../../schemas/authSchema";
import { forgotPasswordDefaultValues } from "../../schemas/authDefaultValues";
import { forgetPasswordAPI } from "@/services/forgetPasswordService";
import Loader from "@/components/loader";
import Icon from "@/components/icon";
import InputComponent from "@/components/input-component";


const ForgetPasswordForm: React.FC = () => {

    const toast = useToast();

    const { handleSubmit, control } = useForm<ForgotPasswordPayload>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: forgotPasswordDefaultValues
    });

    const forgetPasswordMutation = useMutation({
        mutationFn: (data: ForgotPasswordPayload) => forgetPasswordAPI(data),
        onSuccess: (res) => {
            if (res.status === 200) {
                toast.success("Reset Password link send to your email");
            } else {
                toast.error("something went wrong please try again");
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            console.log(error);
        }
    })

    const onSubmit = async (data: ForgotPasswordPayload) => {
        forgetPasswordMutation.mutate(data);
    };

    return (
        <>
            {forgetPasswordMutation.isPending && <Loader />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Email Address
                </label>
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
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold cursor-pointer"
                >
                    {forgetPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </>
    )
}

export default ForgetPasswordForm