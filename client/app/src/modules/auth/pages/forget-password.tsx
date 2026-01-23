import React from 'react'
import ForgetPasswordForm from '../components/forget-password-form';
import Icon from '../../../components/icon';

const ForgetPasswordEmail: React.FC = () => {
    return (
        <div className="w-full flex justify-betweeen ">
            <div className="w-full max-h-screen">
                <img
                    src="/auth/sign-up.svg"
                    alt="login image is not found"
                    className="w-full min-h-screen object-cover"
                />
            </div>

            <div className="w-full flex justify-center items-center">
                <div className='w-2/3 flex flex-col gap-6'>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg transform rotate-5">
                        <Icon name='Mail' width={28} height={28} stroke='white' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className="text-3xl font-bold text-blue-600">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-500">
                            No worries! Enter your email and we'll send you a reset link.
                        </p>
                    </div>


                    <ForgetPasswordForm />

                    <div className="flex flex-col justify-between gap-3 items-center">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                            <Icon name="Info" width={20} height={20} stroke="blue" />
                            <p className="text-sm text-blue-700">
                                Check your spam folder if you don't receive the email within a few minutes.
                            </p>
                        </div>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            <Icon name='ArrowLeft' width={20} height={20} className='hover:text-blue-500' />
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordEmail