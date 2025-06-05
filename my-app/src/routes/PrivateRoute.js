import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role:"none" ;
    console.log(role);
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
