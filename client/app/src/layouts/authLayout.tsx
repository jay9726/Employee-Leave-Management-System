import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <div className="w-full h-max-screen  ">
        <Outlet />
      </div>
    </>
  )
}

export default AuthLayout