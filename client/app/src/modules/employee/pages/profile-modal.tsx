import { X } from 'lucide-react';
import UpdateProfileForm from '../components/update-profile-form';


interface updateProfileModalProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
}

const UpdateProfileModal: React.FC<updateProfileModalProps> = ({ data, onClose }) => {

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 bg-linear-to-br from-blue-500 to-blue-600 p-8 md:p-12">
                        <div className="text-center">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-1">
                                    Edit Profile
                                </h2>
                                <p className="text-blue-100 text-sm">
                                    Update your information
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="relative inline-block">
                                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                        <img
                                            src={`https://localhost:7287${data?.imagePath}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-3/5 p-8 md:p-12 bg-gray-50">
                        <div className="max-w-lg mx-auto">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">Personal Information</h3>
                                <p className="text-gray-600 text-sm">Update your details below</p>
                            </div>

                            <UpdateProfileForm onClose={onClose} user={data} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileModal;