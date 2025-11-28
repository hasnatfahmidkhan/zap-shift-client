import Forbidden from "../../components/Forbidden/Forbidden";
import Spinner from "../../components/Spinner/Spinner";
import useRole from "../../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, userRoleLoading } = useRole();
  if (userRoleLoading) {
    return <Spinner />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
