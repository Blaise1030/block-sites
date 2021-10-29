import React, {createContext, useState} from "react";
type AuthContextType = {
  userData?: {
    name: String;
    img: String;
  };
};

export const AuthenticationContext = createContext<AuthContextType>({});

const Authentication = ({children}: any) => {
  const [userData, _] = useState({
    name: "Tom Cook",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });
  return (
    <AuthenticationContext.Provider value={{userData}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
