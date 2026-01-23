import { useToast } from '@/hooks/toast';
import { authHook } from '@/store/authStore';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { changePasswordSchema, type ChangePasswordPayload } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordDefaultValues } from '../../schemas/authDefaultValues';
import { useMutation } from '@tanstack/react-query';
import { changePasswordAPI } from '@/services/forgetPasswordService';
import Icon from '@/components/icon';
import InputComponent from '@/components/input-component';

const ChangePasswordForm: React.FC = () => {

  const { user } = authHook();
  const toast = useToast();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: any) => changePasswordAPI(data),
    onSuccess: (res) => {
      if (res.data.statusCode === 200) {
        reset();
        toast.success(res.data.message)
      } else if (res.data.statusCode === 404) {
        reset();
        toast.error(res.data.message)
      } else if (res.data.statusCode === 400) {
        reset();
        toast.error(res.data.message)
      } else {
        toast.error("Something went wrong")
      }
    },
    onError: (err) => {
      toast.error(err.message);
    }
  })

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      const payload = {
        ApplicationId: user?.id,
        CurrentPassword: data.CurrentPassword,
        NewPassword: data.NewPassword
      }
      changePasswordMutation.mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 p-8">
      <div>
        <label className="my-3 text-sm font-semibold text-gray-700 mb-2">Current Password</label>
        <Controller
          name="CurrentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <InputComponent
              {...field}
              type='password'
              placeholder="Enter Your Current Password"
              wrapperclassName="w-full"
              togglePassword
              error={fieldState.error?.message}
              leftIcon={<Icon name='password' width={18} height={18} stroke='blue' />}
            />
          )}
        />
      </div>

      <div>
        <label className="my-3 text-sm font-semibold text-gray-700 mb-2">New Password</label>
        <Controller
          name="NewPassword"
          control={control}
          render={({ field,fieldState }) => (
             <InputComponent
              {...field}
              type='password'
              placeholder="Enter Your New Password"
              wrapperclassName="w-full"
              togglePassword
              error={fieldState.error?.message}
              leftIcon={<Icon name='password' width={18} height={18} stroke='blue' />}
            />
          )}
        />
      </div>

      <div>
        <label className="my-3 text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
        <Controller
          name="ConfirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <InputComponent
              {...field}
              type='password'
              placeholder="Enter Your Confirm Password"
              value={field.value || ''}
              wrapperclassName="w-full"
              togglePassword
              error={fieldState.error?.message}
              leftIcon={<Icon name='password' width={18} height={18} stroke='blue' />}
            />
          )}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Icon name="Check" width={20} height={20} />
          Update Password
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm