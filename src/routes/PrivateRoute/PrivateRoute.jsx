
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading-spinner"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} />;
};

export default PrivateRoute;
