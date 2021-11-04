import React, {useContext} from "react";
import useWindowDimensions, {widthResolver} from "../helper";
import HomeIcon from "@heroicons/react/solid/HomeIcon";
import FolderIcon from "@heroicons/react/solid/FolderIcon";
import LogoutIcon from "@heroicons/react/solid/LogoutIcon";
import {Link} from "react-router-dom";
import {AuthenticationContext} from "../contexts/AuthContext";

const DefaultLayout = ({children}: any) => {
  const {logout} = useContext(AuthenticationContext);
  const {width} = useWindowDimensions();
  return (
    <div className="w-full h-full bg-yellow-50">
      <div className="fixed left-0 bottom-0 flex flex-col items-center justify-center h-full p-2">
        <div className="text-black flex flex-col border-2 p-2 rounded border-black bg-white">
          <Link to={`/home/main`}>
            <HomeIcon className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer" />
          </Link>
          <Link to={`/home`}>
            <FolderIcon className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer mt-4" />
          </Link>
          <LogoutIcon
            onClick={logout}
            className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer mt-4 text-red-500"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-4 m-auto py-5"
        style={{width: widthResolver(width)}}
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
