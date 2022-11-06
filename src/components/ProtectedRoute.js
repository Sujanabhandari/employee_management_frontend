import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ isAuthenticated }) => {
  return (
    <div className="container">

      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
