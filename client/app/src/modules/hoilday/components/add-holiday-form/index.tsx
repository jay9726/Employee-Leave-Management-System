import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { holidaySchema, type holidayFormDataPayload } from '../../schemas/holidaySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { holidayDefaultValues } from '../../schemas/holidayDefaultValues';
import { useMutation } from '@tanstack/react-query';
import { addCompanyHolidayAPI } from '@/services/companyholiday';
import InputComponent from '@/components/input-component';
import Icon from '@/components/icon';

const AddHolidayForm: React.FC = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<holidayFormDataPayload>({
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

    const addHolidayMutation = useMutation({
        mutationFn: addCompanyHolidayAPI,
        onSuccess: (res) => {
            if (res.status === 201) {
                navigate("/home/holiday");
            }
        },
    });

    const onSubmit = (data: holidayFormDataPayload) => {
        data.date.toISOString(),
            addHolidayMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-5'>
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

                <div>
                    <label className="block text-sm font-medium mb-1"> Day </label>
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
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1"> Holiday Name </label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputComponent
                                {...field}
                                placeholder="Search holidays by name..."
                                wrapperclassName="w-full"
                                error={fieldState.error?.message}
                                leftIcon={<Icon name='Calendar' width={18} height={18} stroke='blue' />}
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Holiday Type
                    </label>
                    <Controller
                        name="holidayType"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <select
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                                >
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
                </div>

                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition"
                >
                    Add Holiday
                </button>
            </div>
        </form>
    )
}

export default AddHolidayForm