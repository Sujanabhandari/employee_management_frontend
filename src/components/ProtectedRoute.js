import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className="container">
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
