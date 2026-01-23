import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import RootLayout from "@/layouts/rootLayout";


const AuthLayout = lazy(() => import("@/layouts/authLayout"));
const DepartmentLayout = lazy(() => import("../layouts/departmentLayout"));

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const Login = lazy(() => import("../modules/auth/pages/login"));
const Register = lazy(() => import("../modules/auth/pages/register"));
const ForgetPasswordEmail = lazy(() => import("../modules/auth/pages/forget-password"));
const ResetPassword = lazy(() => import("../modules/auth/pages/reset-password"));
const ChangePassword = lazy(() => import("../modules/auth/pages/change-password"));

const HomePage = lazy(() => import("../pages/HomePage"));

const DepartmentList = lazy(() => import("../modules/department/pages/department-list"));
const AddDepartment = lazy(() => import("../modules/department/pages/add-department"));
const UpdateDepartment = lazy(() => import("../modules/department/pages/update-department"));

const LeaveRequestList = lazy(() => import("../modules/leave-request/pages/leave-request-list"));
const UpdateLeaveRequest = lazy(() => import("../modules/leave-request/pages/update-leave-request"));

const EmployeeList = lazy(() => import("@/modules/employee/pages/Employee-List"));
const AddEmployee = lazy(() => import("@/modules/employee/pages/Add-Employee"));
const UpdateEmployee = lazy(() => import("@/modules/employee/pages/Update-Employee"));
const Profile = lazy(() => import("@/modules/employee/pages/profile"));

const AddHoliday = lazy(() => import("@/modules/hoilday/pages/add-holiday"));
const CompanyHolidayList = lazy(() => import("@/modules/hoilday/pages/holiday-list"));
const UpdateHoliday = lazy(() => import("@/modules/hoilday/pages/update-holiday"));

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<Loader />}>
    {Component}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: withSuspense(<AuthLayout />),
        errorElement: withSuspense(<ErrorPage />),
        children: [
          { index: true, element: withSuspense(<Login />) },
          { path: "register", element: withSuspense(<Register />) },
          { path: "forgetpasswordemail", element: withSuspense(<ForgetPasswordEmail />) },
          { path: "resetpassword", element: withSuspense(<ResetPassword />) },
        ],
      },
      {
        path: "home",
        element: withSuspense(<DepartmentLayout />),
        errorElement: withSuspense(<ErrorPage />),
        children: [
          { index: true, element: withSuspense(<HomePage />) },

          {
            path: "department",
            children: [
              { index: true, element: withSuspense(<DepartmentList />) },
              { path: "add", element: withSuspense(<AddDepartment />) },
              { path: "update/:id", element: withSuspense(<UpdateDepartment />) },
            ],
          },

          {
            path: "leave-request",
            children: [
              { index: true, element: withSuspense(<LeaveRequestList />) },
              { path: "update", element: withSuspense(<UpdateLeaveRequest />) },
            ],
          },

          {
            path: "employee",
            children: [
              { index: true, element: withSuspense(<EmployeeList />) },
              { path: "add", element: withSuspense(<AddEmployee />) },
              { path: "update/:id", element: withSuspense(<UpdateEmployee />) },
            ],
          },

          {
            path: "profile",
            children: [
              { index: true, element: withSuspense(<Profile />) },
            ],
          },

          {
            path: "holiday",
            children: [
              { index: true, element: withSuspense(<CompanyHolidayList />) },
              { path: "add", element: withSuspense(<AddHoliday />) },
              { path: "update/:id", element: withSuspense(<UpdateHoliday />) },
            ],
          },

          {
            path: "changepassword",
            children: [
              { index: true, element: withSuspense(<ChangePassword />) },
            ],
          },
        ],
      },
    ]
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
