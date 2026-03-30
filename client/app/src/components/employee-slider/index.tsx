import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Building, Calendar, ChevronLeft, Menu, BookAIcon } from "lucide-react";

const EmployeeSlider = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

 
     const navLinks = [
        { path: "/employee", icon: Home, label: "Dashboard" },
        { path: "/employee/department", icon: Building, label: "Departments" },
        { path: "/employee/holidays", icon: Calendar, label: "Holidays" },
        { path: "/employee/leave-request", icon: BookAIcon, label: "Leave" },
    ];

    const linkBase =
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition";
    const linkActive = "bg-indigo-50 text-indigo-600 shadow-sm";
    const linkInactive =
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

    return (
        <aside
            className={`bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"
                }`}
        >
            <div className="flex items-center justify-between px-3 py-3 border-b">
                {sidebarOpen && (
                    <span className="text-xs font-bold uppercase text-slate-500">
                        Menu
                    </span>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="ml-auto p-1.5 rounded-md text-indigo-600 hover:bg-indigo-50"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </button>
            </div>

            <nav className="mt-3 px-2 space-y-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={`${linkBase} ${isActive ? linkActive : linkInactive
                                }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            {sidebarOpen && <span>{link.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    )
}

export default EmployeeSlider