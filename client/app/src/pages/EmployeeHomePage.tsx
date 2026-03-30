import React from 'react'
import { NavLink } from 'react-router-dom'

const EmployeeHomePage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-slate-800">
            Welcome, Uday 👋
          </h2>
          <p className="text-xs uppercase text-slate-500 font-semibold mt-1">
            Admin
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-right hidden md:block">
          <p className="text-sm text-slate-500">abc@gmail.com</p>
          <NavLink
            to="/home/profile"
            className="text-indigo-600 font-semibold text-sm hover:underline"
          >
            My Profile →
          </NavLink>
        </div>
      </div>

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
            455
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
            Pending Leaves
          </p>
          <h2 className="text-3xl font-bold text-amber-500">
            45
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
            Departments
          </p>
          <h2 className="text-3xl font-bold text-sky-500">
            1502
          </h2>
        </div>
      </div>
    </div>
  )
}

export default EmployeeHomePage