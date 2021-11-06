import React, {createContext, useEffect, useState} from "react";
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

type AuthContextType = {
  errorMessage?: string;
  showErrorMessage?: boolean;
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
  const [errorMessage, setErrorMessage] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [timer, setCurrentTimer] = useState();

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

  useEffect(() => {
    if (showErrorMessage && !timer) {
      const timeout = setTimeout(() => {
        setShowErrorMessage(false);
        setCurrentTimer(undefined);
      }, 3000);
      setCurrentTimer(timeout as any);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showErrorMessage]);

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
      setErrorMessage(e.code);
      setShowErrorMessage(true);
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
      console.log(e);
    }
    setLoadingData(false);
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
      value={{
        login,
        logout,
        projects,
        userData,
        loadingData,
        errorMessage,
        loginWithEmail,
        showErrorMessage,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
