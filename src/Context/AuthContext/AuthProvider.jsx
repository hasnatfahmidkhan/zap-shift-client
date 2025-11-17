import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const authInfo = {
    user,
    setUser,
    authLoading,
    setAuthLoading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
