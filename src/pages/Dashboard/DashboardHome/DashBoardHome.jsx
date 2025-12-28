import { Navigate } from "react-router";
import Spinner from "../../../components/Spinner/Spinner";
import useRole from "../../../hooks/useRole";
import AdminDashBoardHome from "./AdminDashBoardHome";
import RiderDashBoardHome from "./RiderDashBoardHome";

const DashBoardHome = () => {
  const { role, userRoleLoading } = useRole();

  if (userRoleLoading) {
    return <Spinner />;
  }
  if (role === "user") {
    return <Navigate to={"/dashboard/my-parcels"} />;
  }
  if (role === "admin") {
    return <AdminDashBoardHome />;
  }
  if (role === "rider") {
    return <RiderDashBoardHome />;
  }
};

export default DashBoardHome;
