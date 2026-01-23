import { Toaster } from "../components/ui/sonner"
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-screen  ">
        <Outlet />
        <Toaster position="top-right" toastOptions={{ unstyled: true }} />
      </div>
    </>
  )
}

export default RootLayout