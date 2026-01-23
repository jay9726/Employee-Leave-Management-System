import Loader from "@/components/loader";
import { getDepartmentCountAPI } from "@/services/departmentService";
import { getPendingLeaveRequestCountAPI } from "@/services/leaveRequestService";
import { getEmployeeCountAPI } from "@/services/userService";
import { authHook } from "@/store/authStore";
import { useQueries } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";


export default function HomePage() {

    debugger
    const { user } = authHook();

    const result = useQueries({
        queries: [
            {
                queryKey: ['allemployeecount'],
                queryFn: () => getEmployeeCountAPI()
                    .then((res) => { return res.data.data }),
                enabled: user?.role === 'Admin'
            },
            {
                queryKey: ['pendingleaveRequestcount'],
                queryFn: () => getPendingLeaveRequestCountAPI()
                    .then((res) => { return res.data.data }),
                enabled: user?.role === 'Admin'
            },
            {
                queryKey: ['departmentcount'],
                queryFn: () => getDepartmentCountAPI()
                .then((res) => { return res.data.data }),
                enabled: user?.role === 'Admin'
            },
        ]
    })

    return (
        <>
        
            { user?.role === 'Admin' &&(result[0].isPending || result[1].isPending || result[2].isPending) && <Loader />}
            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-slate-800">
                            Welcome, {user?.fullName} 👋
                        </h2>
                        <p className="text-xs uppercase text-slate-500 font-semibold mt-1">
                            {user?.role}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 text-right hidden md:block">
                        <p className="text-sm text-slate-500">{user?.email}</p>
                        <NavLink
                            to="/home/profile"
                            className="text-indigo-600 font-semibold text-sm hover:underline"
                        >
                            My Profile →
                        </NavLink>
                    </div>
                </div>

                {
                    user?.role === 'Admin' && (
                        <>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                                <h4 className="text-sm font-bold uppercase text-slate-500">
                                    System Overview
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
                                    <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
                                        Total Employees
                                    </p>
                                    <h2 className="text-3xl font-bold text-indigo-600">
                                        {result[0].data}
                                    </h2>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
                                    <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
                                        Pending Leaves
                                    </p>
                                    <h2 className="text-3xl font-bold text-amber-500">
                                        {result[1].data}
                                    </h2>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
                                    <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
                                        Departments
                                    </p>
                                    <h2 className="text-3xl font-bold text-sky-500">
                                        {result[2].data}
                                    </h2>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}