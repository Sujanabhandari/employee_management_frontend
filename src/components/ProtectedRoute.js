import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

const ProtectedLayout = () => {
  const { isAuthenticated } = useMainContext();
  return (
    <div className="container">
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
