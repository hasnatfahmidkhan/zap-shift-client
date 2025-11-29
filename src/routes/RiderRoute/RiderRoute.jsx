import React from "react";
import useRole from "../../hooks/useRole";
import Spinner from "../../components/Spinner/Spinner";
import Forbidden from "../../components/Forbidden/Forbidden";
import useAuth from "../../hooks/useAuth";

const RiderRoute = ({ children }) => {
  const { authLoading } = useAuth();
  const { role, userRoleLoading } = useRole();
  if (userRoleLoading || authLoading) {
    return <Spinner />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
