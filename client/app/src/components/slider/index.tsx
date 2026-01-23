import React, { useState } from 'react'
import {
  Home,
  Users,
  Building,
  Calendar,
  ChevronLeft,
  Menu,
  BookAIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { authHook } from '@/store/authStore';

const Slider: React.FC = () => {

  const { user } = authHook();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navLinks = [
        { path: "/home", icon: Home, label: "Dashboard", roles: ["Admin", "Employee"] },
        { path: "/home/employee", icon: Users, label: "Employees", roles: ["Admin"] },
        { path: "/home/department", icon: Building, label: "Departments", roles: ["Admin", 'Employee'] },
        { path: "/home/holiday", icon: Calendar, label: "Holidays", roles: ["Admin", "Employee"] },
        { path: "/home/leave-request", icon: BookAIcon, label: "Leave", roles: ["Employee"] },
        { path: "/home/leave-request/update", icon: BookAIcon, label: "Update Leave", roles: ["Admin"] },
    ];

    const linkBase =
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition";
    const linkActive = "bg-indigo-50 text-indigo-600 shadow-sm";
    const linkInactive =
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

    const filteredNavLinks = navLinks.filter((link) =>
        link.roles.includes(user?.role || "")
    );

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
                {filteredNavLinks.map((link) => {
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

export default Slider