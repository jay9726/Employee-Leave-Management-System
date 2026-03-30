import AdminSlider from '@/components/admin-slider'
import Navbar from '@/components/navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">

                <AdminSlider />

                <main className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default AdminLayout