import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // handle google login
  const GoogleLoginFunc = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign out or log out
  const signOutFunc = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscirbe();
  }, []);

  const authInfo = {
    user,
    setUser,
    authLoading,
    setAuthLoading,
    GoogleLoginFunc,
    signOutFunc,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
