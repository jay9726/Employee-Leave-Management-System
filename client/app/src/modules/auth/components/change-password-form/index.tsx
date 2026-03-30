import { useToast } from '@/hooks/toast';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { changePasswordSchema, type ChangePasswordPayload } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordDefaultValues } from '../../schemas/authDefaultValues';
import Icon from '@/components/icon';
import InputComponent from '@/components/input-component';
import { useChangePassword } from '../../apis/mutation';
import { SessionAuthentication } from '../../guards/sessionAuthentication';

const ChangePasswordForm: React.FC = () => {

  const toast = useToast();
  const session = SessionAuthentication.getSession();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = async (data: ChangePasswordPayload) => {
    const payload = {
      ApplicationId: session?.authUser?.employeeId,
      CurrentPassword: data.CurrentPassword,
      NewPassword: data.NewPassword
    }
    mutate(payload, {
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
    });
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
              disable={isPending}
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
          render={({ field, fieldState }) => (
            <InputComponent
              {...field}
              type='password'
              placeholder="Enter Your New Password"
              wrapperclassName="w-full"
              togglePassword
              disable={isPending}
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
              disable={isPending}
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
          {isPending ? 'Updating Password...' : 'Update Password'}
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm