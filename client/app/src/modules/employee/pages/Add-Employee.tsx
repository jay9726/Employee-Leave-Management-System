import React, { useEffect } from 'react'
import AddEmployeeFrom from '../components/add-employee-form'
import { authHook } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const AddEmployee: React.FC = () => {

    const { user } = authHook();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate(-1);
        }
    }, [user])

    return (
        <div className="w-full h-full flex ">
            <div className='w-full h-157'>
                <img
                    src='/auth/add-employee.svg'
                    alt='not found'
                    className='w-full h-full object-cover'
                />
            </div>

            <div className="w-full flex flex-col justify-center gap-5 px-10">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 ">Employee Information</h3>
                    <p className="text-gray-600">Fill in the details below to create a new user account</p>
                </div>
                <div className='w-full'>

                    <AddEmployeeFrom />

                </div>
            </div>
        </div>
    )
}

export default AddEmployee