import React, { useState } from 'react'
import Icon from '@/components/icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setEmployee } from '@/redux/slice/employeeSlice';
import Loader from '@/components/loader';
import EmployeeListCard from '../components/employee-list-card';
import InputComponent from '@/components/input-component';
import { Search } from 'lucide-react';
import { useGetAllUsers } from '../apis/queries';

const EmployeeList: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchEmloyee, setSearchEmloyee] = useState('')

  const { data, isPending } = useGetAllUsers();
  dispatch(setEmployee(data?.data))


  // const employee = useSelector((state: any) => state.employee.employee);

  // const filterEmployee = employee.filter((emp: any) => {
  //   return (
  //     emp.fullName.toLowerCase().includes(searchEmloyee.toLowerCase()) ||
  //     emp.email.toLowerCase().includes(searchEmloyee.toLowerCase()) ||
  //     emp.departmentName.toLowerCase().includes(searchEmloyee.toLowerCase())
  //   )
  // })


  const getContent = () => {
    if (isPending) {
      return <Loader />
    } else if (data?.data.length > 0) {
      return (
        data?.data.map((user: any) => (
          <EmployeeListCard key={user.id} user={user} />
        ))
      )
    }
  }

  return (
    <>
      <div className="min-h-screen py-2 px-2">
        <div className="max-w-full h-full flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap ">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 ">
                <Icon name="Users" width={32} height={32} stroke="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-600">
                  Team Directory
                </h1>
                <p className="text-gray-600">Your organization's talented members</p>
              </div>
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
              onClick={() => navigate('/admin/employee/add')}
            >
              <Icon name="UserPlus" width={20} height={20} stroke="white" />
              Add Member
            </button>
          </div>

          <InputComponent
            placeholder="Search Employee by Name, Email, Department..."
            wrapperclassName="w-full"
            leftIcon={<Search className="w-4 h-4" stroke='gray' />}
            onChange={setSearchEmloyee}
            value={searchEmloyee}
          />

          {data?.data.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Icon name="Users" width={64} height={64} stroke="gray" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">No members found</h3>
                <p className="text-gray-500 text-lg">Start building your team by adding new members</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getContent()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeList