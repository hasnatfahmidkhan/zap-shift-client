import Spinner from "../../../components/Spinner/Spinner";
import useRole from "../../../hooks/useRole";
import AdminDashBoardHome from "./AdminDashBoardHome";
import RiderDashBoardHome from "./RiderDashBoardHome";
import UserDashBoardHome from "./UserDashBoardHome";

const DashBoardHome = () => {
  const { role, userRoleLoading } = useRole();

  if (userRoleLoading) {
    return <Spinner />;
  }
  if (role === "admin") {
    return <AdminDashBoardHome />;
  }
  if (role === "rider") {
    return <RiderDashBoardHome />;
  }
  if (role === "user") {
    return <UserDashBoardHome />;
  }
};

export default DashBoardHome;
