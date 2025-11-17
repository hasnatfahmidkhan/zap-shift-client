import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return <div>{user.displayName}</div>;
};

export default Profile;
