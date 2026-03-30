import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaPayload } from "../../schemas/authSchema";
import { loginDefaultValues } from "../../schemas/authDefaultValues";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader";
import Icon from "../../../../components/icon";
import InputComponent from "@/components/input-component";
import { useLogin } from "../../apis/mutation";
import { SessionAuthentication } from "../../guards/sessionAuthentication";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slice/authSlice";
import { useToast } from "@/hooks/toast";


const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const disPatch = useDispatch();
    const toast = useToast();

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
    })

    const { mutate, isPending } = useLogin();

    const onSubmit = async (data: LoginSchemaPayload) => {
        mutate(data, {
            onSuccess: (res) => {
                debugger
                disPatch(loginUser(res.data))
                SessionAuthentication.setSession(res.data)

                if (res.data.authUser.role === 'Admin') {
                    navigate('/admin')
                    toast.success("Login Successfully");
                } else {
                    navigate('/employee')
                    toast.success("Login Successfully");
                }
            },
            onError: (error) => {
                debugger
                if (error?.response?.status === 401) {
                    toast.error("Invalid email or password");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }
        })
    }

    return (
        <>
            {isPending && <Loader />}
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
                        {isPending ? "Singing In..." : "Sign In"}
                        <Icon name="ArrowRight" width={20} height={20} stroke="white" />
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm