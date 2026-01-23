import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteDepartmentAPI, getAllDepartmentsAPI } from "../../../services/departmentService"
import { authHook } from "../../../store/authStore"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import Icon from "../../../components/icon"
import DepartmentListTable from "../components/department-list-table"
import { useToast } from "@/hooks/toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { removeDepartment, setDepartments } from "@/redux/slice/departmentSlice"
import Loader from "@/components/loader"
import Paggination from "@/components/pagination-component"
import { setCurrentPage, setTotalPages } from "@/redux/slice/paginationSlice"


const DepartmentList = () => {

  const { user } = authHook();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, [user])



  const toast = useToast();
  const [searchParam, setSearchParams] = useSearchParams();
  const departments = useSelector((state: any) => state.department.department);
  
  
  const { currentPage, itemPerPage, totalPages } = useSelector((state: any) => state.pagination)
  const totalPage = Math.ceil(1000 / itemPerPage);
  dispatch(setTotalPages(totalPage));

  const { isPending } = useQuery({
    queryKey: ['department', currentPage],
    queryFn: () => getAllDepartmentsAPI(currentPage)
      .then((res) => {
        dispatch(setDepartments(res.data.data));
      }),
    staleTime: 5 * 60 * 1000,
  });


  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage]);



  const deleteDepartmentMutation = useMutation({
    mutationFn: (id: number) => deleteDepartmentAPI(id),
    onSuccess: (res: any, id: number) => {
      console.log(res)
      dispatch(removeDepartment(id));
      toast.success("Department deleted successfully");
    },
    onError: (res: any) => {
      toast.error(res.data);
    },
  })


  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteDepartmentMutation.mutate(id)
    }
  }


  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="w-full">
          <div className="">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Building" width={26} height={26} stroke="white" />
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="w-full">
                  <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Department Management
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">Manage and organize all departments</p>
                </div>
                {/* <div className="w-full">
                  <InputComponent
                    placeholder="Search Department by Name..."
                    wrapperclassName="w-full"
                    leftIcon={<Search className="w-4 h-4" stroke='gray' />}
                    value={searchDepartmet}
                    onChange={setSearchDepartmet}
                  />
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icon name="Notebook" width={25} height={25} stroke="white" />
                <h3 className="text-xl font-semibold text-white">
                  All Departments
                </h3>
                <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {departments?.length} Total
                </span>
              </div>

              {user?.role === "Admin" && (
                <NavLink
                  to="/home/department/add"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Icon name="Plus" width={20} height={20} stroke="blue" />
                  Add Department
                </NavLink>
              )}
            </div>
            <DepartmentListTable data={departments} user={user} handleDelete={handleDelete} />
          </div>
        </div>
        <div className="p-3">
          <Paggination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => { dispatch(setCurrentPage(page)) }}
          />
        </div>
      </div>
    </>
  )
}

export default DepartmentList