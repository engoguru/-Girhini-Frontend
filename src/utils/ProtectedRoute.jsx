// import { Navigate, Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchUser } from "../store/slice/userSlice";
// function ProtectedRoute({ allowedRole }) {
//   const dispatch = useDispatch();
//   const { meDetail, loading } = useSelector((state) => state?.user);

//   useEffect(() => {
//     if (!meDetail) dispatch(fetchUser());
//   }, [dispatch, meDetail]);

//   // Show nothing or a loader while fetching
//   if (!meDetail && loading) return <div>Loading...</div>;

//   // User not fetched yet
//   if (!meDetail) return null;

//   const hasAccess = Array.isArray(allowedRole)
//     ? allowedRole.includes(meDetail.role)
//     : meDetail.role === allowedRole;

//   if (!hasAccess) return <Navigate to="/" replace />;

//   return <Outlet />;
// }

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/slice/userSlice";

function ProtectedRoute({ allowedRole }) {
  const dispatch = useDispatch();
  const { meDetail, loading } = useSelector((state) => state?.user);

  useEffect(() => {
    if (!meDetail) dispatch(fetchUser());
  }, [dispatch, meDetail]);

  // Show loader while fetching user
  if (loading) return <div>Loading...</div>;

  // If user not logged in → redirect to login/register page
  if (!meDetail) return <Navigate to="/auth-user" replace />;

  // Check role access
  const hasAccess = Array.isArray(allowedRole)
    ? allowedRole.includes(meDetail.role)
    : meDetail.role === allowedRole;

  // If role doesn't match → redirect to their respective dashboard
  if (!hasAccess) {
    if (meDetail.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
    if (meDetail.role === "User") return <Navigate to="/user/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Authorized → render child route
  return <Outlet />;
}

export default ProtectedRoute;


