import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { holidaySchema, type holidayFormDataPayload } from '../../schemas/holidaySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { holidayDefaultValues } from '../../schemas/holidayDefaultValues';
import Loader from '@/components/loader';
import InputComponent from '@/components/input-component';
import Icon from '@/components/icon';
import { useGetCompanyHolidayById } from '../../apis/queries';
import { useUpdateCompanyHoliday } from '../../apis/mutation';
import { useToast } from '@/hooks/toast';

const UpdateHolidayForm: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<holidayFormDataPayload>({
        resolver: zodResolver(holidaySchema),
        defaultValues: holidayDefaultValues
    });


    const handleDateChange = (value: string) => {
        if (!value) return;

        const date = new Date(value);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        setValue("date", date);
        setValue("day", days[date.getDay()]);
    };


    const { data, isPending } = useGetCompanyHolidayById(id as string);
    useEffect(() => {
        if (data?.data) {
            reset(data.data);
        }
    }, [data])

    { isPending && <Loader /> }

    const { mutate, isPending: isUpdatePending } = useUpdateCompanyHoliday();

    const onSubmit = (data: holidayFormDataPayload) => {
        data.date.toISOString(),
            mutate({ companyHolidayId: id as string, data }, {
                onSuccess: () => {
                    navigate("/admin/holidays");
                    toast.success('Holiday updated successfully');
                },
                onError: () => {
                    toast.error('Failed to update holiday');
                },
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Select Date
                    </label>
                    <input
                        type="date"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                            Date is required
                        </p>
                    )}
                </div>

                <label className="block text-sm font-medium mb-1">
                    Day
                </label>
                <Controller
                    name="day"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <input
                                {...field}
                                readOnly
                                className="w-full bg-gray-100 border rounded-md px-3 py-2"
                                placeholder="Auto-filled"
                            />
                        </div>
                    )}
                />
                {errors.day && (
                    <p className="text-red-500 text-sm">{errors.day.message}</p>
                )}

                <label className="block text-sm font-medium mb-1">
                    Holiday Name
                </label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputComponent
                            {...field}
                            placeholder="Enter Holiday Name"
                            wrapperclassName="w-full"
                            error={fieldState.error?.message}
                            leftIcon={<Icon name='Calendar' width={18} height={18} stroke='blue' />}
                        />
                    )}
                />

                <Controller
                    name="holidayType"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Holiday Type
                            </label>
                            <select
                                {...field}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            >
                                <option value={''}>Select Type</option>
                                <option value={1}>Regular Holiday</option>
                                <option value={2}>Floating Holiday</option>
                            </select>
                        </div>
                    )}
                />
                {errors.holidayType && (
                    <p className="text-red-500 text-sm">
                        Holiday type is required
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition"
                >
                    {isUpdatePending ? 'Updating Holiday...' : 'Update Holiday'}
                </button>
            </form>
        </>
    )
}

export default UpdateHolidayForm