import React from 'react'
import { Building2, Shield, CheckCircle2} from 'lucide-react';
import UpdateEmployeeForm from '../components/update-employee-form';


const UpdateEmployee: React.FC = () => {
    return (
        <>
            <div className="w-full ">
                <div className="w-full min-h-auto flex justify-between ">

                    <div className="w-full bg-linear-to-br py-5.5 from-indigo-600 to-blue-600 flex flex-col justify-center items-center text-white ">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 text-center">
                            <div className="mb-8">
                                <div className="w-48 h-48 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
                                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <span className="text-6xl font-bold text-white">
                                            Demo
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-2">Demo</h2>
                            <p className="text-blue-100 text-lg mb-4">demo@example.com</p>

                            <div className="space-y-4 max-w-md mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                <Building2 className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm text-blue-100">Department</p>
                                                <p className="font-semibold text-lg">Demo Department</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm text-blue-100">Status</p>
                                                <p className="font-semibold text-lg">Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm text-blue-100">Access Level</p>
                                                <p className="font-semibold text-lg">Standard</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-12">
                        <div className="max-w-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Edit Information</h3>
                            <p className="text-gray-600 mb-8">Update user details and save changes</p>

                            <UpdateEmployeeForm  />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee