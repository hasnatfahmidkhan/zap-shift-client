import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // create user with email pass
  const registerEmailPassFunc = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateProfileFunc = (displayName, photoURL) => {
    setAuthLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  // sign in with email pass
  const signInEmailPassFunc = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle google login
  const GoogleLoginFunc = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign out or log out
  const signOutFunc = () => {
    return signOut(auth);
  };

  // password reset
  const resetPassFunc = (email) => {
    return sendPasswordResetEmail(auth, email);
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
    resetPassFunc,
    signInEmailPassFunc,
    registerEmailPassFunc,
    updateProfileFunc,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
