import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaPayload } from "../../schemas/authSchema";
import { loginDefaultValues } from "../../schemas/authDefaultValues";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authHook } from "../../../../store/authStore";
import { loginAPI } from "../../../../services/authService";
import Loader from "../../../../components/loader";
import Icon from "../../../../components/icon";
import { useToast } from "../../../../hooks/toast";
import InputComponent from "@/components/input-component";


const LoginForm: React.FC = () => {

    const toast = useToast();
    const { loginUser } = authHook();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
    })

    const loginMutation = useMutation({
        mutationFn: loginAPI,
        onSuccess: (res) => {
            debugger
            if (res.status === 200) {
                loginUser(res.data);
                navigate('/home');
                toast.success("Login Successfull!!!");
            } else {
                toast.error("Login Failed! Please Register Yourself");
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            console.log(error);
        }
    })

    const onSubmit = async (data: LoginSchemaPayload) => {
        try {
            loginMutation.mutate(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {loginMutation.isPending && <Loader />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700 ">Email Address</label>
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
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <Controller
                            name="Password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <InputComponent
                                    {...field}
                                    type="password"
                                    placeholder="Enter Your Password"
                                    wrapperclassName="w-full"
                                    error={fieldState.error?.message}
                                    togglePassword={true}
                                    leftIcon={<Icon name="password" width={16} height={16} stroke="blue" />}
                                />
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <a href="/forgetpasswordemail" className="text-sm font-medium text-blue-600 hover:text-indigo-600 transition-colors">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {loginMutation.isPending ? "Singing In..." : "Sign In"}
                        <Icon name="ArrowRight" width={20} height={20} stroke="white" />
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm