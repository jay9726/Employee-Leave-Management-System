import { useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../components/reset-password-form";
import Icon from "../../../components/icon";

const ResetPassword = () => {

    const [searchParam] = useSearchParams();
    const email = searchParam.get("email") || "";
    const token = searchParam.get("token") || "";

    return (
        <div className="w-full flex justify-betweeen ">
            <div className="w-full max-h-screen">
                <img
                    src="/auth/reset-password.svg"
                    alt="login image is not found"
                    className="w-full min-h-screen object-cover" />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-2/3 flex flex-col gap-5">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg transform -rotate-3">
                        <Icon name='KeyRound' width={28} height={28} stroke='white' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold text-blue-500 ">
                            Reset Password
                        </h2>
                        <p className="text-gray-500">
                            Your new password must be strong and secure
                        </p>
                    </div>

                    <ResetPasswordForm email={email} token={token} />

                    <div className="flex items-start gap-3 ">
                        <Icon name='CircleCheck' width={20} height={20} stroke='gray' />
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Your password will be encrypted and stored securely. We recommend using a unique password that you don't use elsewhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
