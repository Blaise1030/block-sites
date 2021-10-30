import React from "react";
import useWindowDimensions, {widthResolver} from "../helper";
import HomeIcon from "@heroicons/react/solid/HomeIcon";
import FolderIcon from "@heroicons/react/solid/FolderIcon";
import LogoutIcon from "@heroicons/react/solid/LogoutIcon";
import {Link, useRouteMatch} from "react-router-dom";

const DefaultLayout = ({children}: any) => {
  const {width} = useWindowDimensions();
  const match = useRouteMatch();
  return (
    <div className="w-full h-full">
      <div className="fixed left-0 bottom-0 bg-white flex flex-col items-center justify-center h-full p-2">
        <div className="text-black flex flex-col border-2 p-2 rounded border-black bg-white">
          <Link to={`${match.url}/main`}>
            <HomeIcon className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer" />
          </Link>
          <Link to={`${match.url}`}>
            <FolderIcon className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer mt-4" />
          </Link>
          <Link to={"/login"}>
            <LogoutIcon className="w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer mt-4 text-red-500" />
          </Link>
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
