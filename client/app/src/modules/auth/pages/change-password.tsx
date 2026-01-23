import React, { useEffect } from 'react'
import Icon from '@/components/icon';
import ChangePasswordForm from '../components/change-password-form';
import { authHook } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {

  const { user } = authHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role === 'Admin') {
      navigate(-1)
    }
  },[user, navigate])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="w-full flex flex-col justify-center items-start gap-4 px-10 bg-blue-500 ">
          <h2 className="flex gap-2 text-2xl font-bold text-white">
            <Icon name="ShieldCheck" width={28} height={28} stroke="white" />
            Change Your Password
          </h2>
          <p className="text-white ">
            Please enter your current password and choose a new one
          </p>
          <div className="flex gap-2">
            <Icon name="Info" width={16} height={16} stroke="white" />
            <span className='text-white'>Your password will be encrypted and stored securely.</span>
          </div>
        </div>

        <div className='w-full'>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword