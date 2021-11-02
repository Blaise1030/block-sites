import React, {createContext, useEffect, useState} from "react";
import {auth} from "../api/firebase";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useHistory} from "react-router";

type AuthContextType = {
  logout: () => void;
  login: () => void;
  userData?: {
    email: string;
    name: string;
    img: string;
    id: string;
  };
};

export const AuthenticationContext = createContext<AuthContextType>({});

const Authentication = ({children}: any) => {
  const [userData, setUserData] = useState();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUserData({
          id: user.uid,
          name: user?.displayName,
          img: user?.photoURL,
          email: user.email,
        } as any);
      } else setUserData(undefined);
    });
  }, []);

  const login = async () => {
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = res.user;
      console.log(user);
      setUserData({
        id: user.uid,
        name: user?.displayName,
        img: user?.photoURL,
        email: user.email,
      });
      history.push("/home");
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    try {
      auth.signOut();
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthenticationContext.Provider value={{userData, login, logout}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;

// {
//   name: "Tom Cook",
//   img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// }
