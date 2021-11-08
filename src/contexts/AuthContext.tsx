import React, {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../api/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {useHistory} from "react-router";
import getUserProject from "../api/getUserProject";
import {NotifContext} from "./NotifContext";

type AuthContextType = {
  logout: () => void;
  login: (method: "Google" | "Facebook" | "Github") => void;
  loginWithEmail: (email: string, password: string) => void;
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
  projects: [],
  login: () => {},
  logout: () => {},
  loadingData: false,
  loginWithEmail: () => {},
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
  const [loadingData, setLoadingData] = useState(false);
  const {setMessageData, setShowNotification} = useContext(NotifContext);

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

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoadingData(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      setUserData({
        id: user.uid,
        name: user?.displayName,
        img: user?.photoURL,
        email: user.email,
      } as any);
      history.push("/home");
    } catch (e) {
      setMessageData({
        message: e.code,
        type: "error",
      });
      setShowNotification(true);
    }
    setLoadingData(false);
  };

  const login = async (methods: "Google" | "Facebook" | "Github") => {
    const options = {
      Google: new GoogleAuthProvider(),
      Facebook: new FacebookAuthProvider(),
      Github: new GithubAuthProvider(),
    };

    try {
      setLoadingData(true);
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
      setMessageData({
        message: e.code,
        type: "error",
      });
      setShowNotification(true);
    }
    setLoadingData(false);
  };

  const logout = () => {
    try {
      auth.signOut();
      history.push("/login");
    } catch (e) {
      setMessageData({
        message: e.code,
        type: "error",
      });
      setShowNotification(true);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        login,
        logout,
        projects,
        userData,
        loadingData,
        loginWithEmail,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
