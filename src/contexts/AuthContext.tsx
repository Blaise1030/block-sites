import React, {createContext, useEffect, useState} from "react";
import {auth} from "../api/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {useHistory} from "react-router";
import getUserProject from "../api/getUserProject";

type AuthContextType = {
  logout: () => void;
  login: (method: "Google" | "Facebook" | "Github") => void;
  userData?: {
    email: string;
    name: string;
    img: string;
    id: string;
  };
  projects: Array<any>;
  loadingData: boolean;
};

export const AuthenticationContext = createContext<AuthContextType>({
  logout: () => {},
  login: () => {},
  projects: [],
  loadingData: false,
});

const Authentication = ({children}: any) => {
  const history = useHistory();
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    img: string;
    id: string;
  }>();
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          id: user.uid,
          name: user?.displayName,
          img: user?.photoURL,
          email: user.email,
        } as any);
        history.push("/home");
      } else setUserData(undefined);
    });
  }, []);

  useEffect(() => {
    if (userData) {
      getUserProject(userData.id, (data: any) => {
        if (data) setProjects(data);
        setLoadingData(false);
      });
    }
  }, [userData]);

  const login = async (methods: "Google" | "Facebook" | "Github") => {
    const options = {
      Google: new GoogleAuthProvider(),
      Facebook: new FacebookAuthProvider(),
      Github: new GithubAuthProvider(),
    };

    try {
      const res = await signInWithPopup(auth, options[methods]);
      const user = res.user;
      setUserData({
        id: user.uid,
        name: user?.displayName,
        img: user?.photoURL,
        email: user.email,
      } as any);
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
    <AuthenticationContext.Provider
      value={{loadingData, userData, login, logout, projects}}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
