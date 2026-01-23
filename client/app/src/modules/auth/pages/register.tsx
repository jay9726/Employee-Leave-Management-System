import RegisterForm from "../components/register-form"

const Register = () => {
    return (
        <div className="w-full flex justify-betweeen ">
            <div className="w-full">
                <img
                    src="/auth/sign-up.svg"
                    alt="not found"
                    className="w-full min-h-screen object-cover"
                    />
            </div>
            <div className="w-full flex items-center justify-center bg-gray-50">
                <div className="w-2/3 flex flex-col gap-5">
                    <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-3xl font-bold text-gray-900">Create Account</h3>
                            <p className="text-gray-600">Fill in your details to get started</p>
                        </div>

                        <RegisterForm />

                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                        </p>
                        <a href="/" className="font-sm text-blue-600">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register