import EmployeeSlider from '@/components/employee-slider'
import Navbar from '@/components/navbar'
import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
    return (
        <>
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">

                <EmployeeSlider />

                <main className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default EmployeeLayout