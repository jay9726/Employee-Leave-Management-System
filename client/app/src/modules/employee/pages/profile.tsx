import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import Icon from '@/components/icon';
import { useNavigate } from 'react-router-dom';
import { authHook } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getUserByIdAPI } from '@/services/userService';
import UpdateProfileModal from './profile-modal';

const Profile: React.FC = () => {

    const { user } = authHook();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(-1);
        }
    }, [user])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserByIdAPI(user!.id),
        enabled: !!user?.id
    })


    return (
        <div className="w-full max-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <button
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                        onClick={() => navigate(-1)}
                    >
                        <Icon name="ArrowLeft" width={20} height={20} />
                        <span className="font-medium">Back to Home</span>
                    </button>
                </div>

                <div className="flex justify-between bg-white border rounded-2xl overflow-hidden">
                    <div className="w-full max-h-screen bg-linear-to-r from-blue-500 to-purple-600 px-8 py-12 text-center">
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white bg-white overflow-hidden">
                            <img
                                src={`https://localhost:7287${user?.imagePath}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {data?.data[0].fullName}
                        </h1>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Building2 className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">
                                {data?.data[0].departmentName}
                            </span>
                        </div>
                    </div>

                    <div className="w-full h-full flex flex-col gap-5 px-10 py-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                            <button
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Icon name='EditBadge' width={20} height={20} stroke='currentColor' />
                                <span className="text-sm font-medium">Edit Profile</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Icon name="UserRound" width={20} height={20} stroke='blue' />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Username</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {data?.data[0].fullName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex justify-center items-center">
                                    <Icon name="Mail" width={20} height={20} stroke='blue' />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="text-base font-medium text-gray-900 ">
                                        {data?.data[0].email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Icon name="Building" width={20} height={20} stroke='blue' />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {data?.data[0].departmentName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <UpdateProfileModal
                    data={data?.data?.[0]}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Profile;