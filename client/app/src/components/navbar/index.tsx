import { useNavigate } from 'react-router-dom';
import { authHook } from '../../store/authStore';
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logoutUser } = authHook();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <>
            <nav className="sticky top-0 w-full bg-white z-1">
                <div className="flex justify-between items-center h-auto px-28 py-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-3 rounded-xl ">
                            <img
                                src="/vite.svg"
                                width={25}
                                height={25}
                                className="brightness-0 invert"
                                alt="Logo"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                ELMS
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">Management System</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative ml-3" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                            >
                                <div className="profile-avatar w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                    <img
                                        src={`https://localhost:7287${user?.imagePath}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-bold text-gray-900">{user?.fullName || 'User'}</p>
                                    <p className="text-xs text-gray-500 font-medium">{user?.role || 'Member'}</p>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isProfileOpen && (
                                <div className="dropdown-menu absolute right-0 mt-0 w-72 bg-white rounded-2xl shadow-2xl border border-blue-600 overflow-hidden">
                                    <div className="bg-linear-to-br from-blue-500 to-purple-600 p-5 text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <p className="font-bold text-base">{user?.fullName || 'User Name'}</p>
                                                <p className="text-sm text-blue-100">{user?.email || 'user@example.com'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            onClick={() => {
                                                navigate('/home/profile');
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                                        >
                                            <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-sm">My Profile</p>
                                                <p className="text-xs text-gray-500">View your profile</p>
                                            </div>
                                        </button>

                                        <div className="my-2 border-t border-gray-200"></div>

                                        <button
                                            onClick={() => {
                                                navigate('/home/changepassword');
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                                        >
                                            <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-sm">Change Password</p>
                                            </div>
                                        </button>

                                        <div className="my-2 border-t border-gray-200"></div>

                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                                        >
                                            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                                                <LogOut className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-sm">Logout</p>
                                                <p className="text-xs text-red-400">Sign out of your account</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;