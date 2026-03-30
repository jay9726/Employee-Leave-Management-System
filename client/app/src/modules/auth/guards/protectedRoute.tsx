import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export type Role = 'Admin' | 'Employee'

export const ProtectedRoute: React.FC<{ AllowRole: Role[] }> = ({ AllowRole }) => {
    const { isAuthenticated, authUser } = useSelector((state: any) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to="/" state={{ from: location.pathname }} replace />;
    if (!authUser) return <Navigate to="/" replace />;
    if (!AllowRole.includes(authUser.role)) return <Navigate to="/unauthorized" replace />;

    return <Outlet />
}