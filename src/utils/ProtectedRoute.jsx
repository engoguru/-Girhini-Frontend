import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const meDetail = allowedRole; // replace with real auth later
  
  if (meDetail !==allowedRole) {
    return <Navigate to="/auth-user" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

