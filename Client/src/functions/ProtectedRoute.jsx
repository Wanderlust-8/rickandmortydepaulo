import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ Access, redirectPath = "/" }) => {
    if (!Access) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
export default ProtectedRoute;