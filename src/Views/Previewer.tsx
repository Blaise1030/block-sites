import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {CreatorContext} from "../contexts/CreatorContext";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import Renderer from "../components/Renderer";

const Previewer = () => {
  const {packageSiteInfo} = useContext(CreatorContext);
  const history = useHistory();

  return (
    <div className="w-full h-full relative">
      <div
        className="               
        cursor-pointer                
        left-3        
        fixed
        top-3                              
        z-20"
      >
        <div
          className="bg-blue-500 text-white font-semibold py-1 px-2 rounded w-full flex flex-row items-center justify-center"
          onClick={() => history.goBack()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <div>Back</div>
        </div>
      </div>
      <Renderer pageData={packageSiteInfo() as any} />
    </div>
  );
};

export default Previewer;
