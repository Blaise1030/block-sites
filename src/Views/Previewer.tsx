import {useContext} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {CreatorContext} from "../contexts/CreatorContext";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import Renderer from "../components/Renderer";
import {putProjectData} from "../api/putPageData";

const Previewer = () => {
  const {packageSiteInfo} = useContext(CreatorContext);
  const history = useHistory();
  const match = useRouteMatch();

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
          className="bg-blue-500 text-white font-semibold py-1 pl-1 pr-2 rounded w-full flex flex-row items-center justify-center"
          onClick={() => history.goBack()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <div>Back</div>
        </div>
      </div>
      <div
        className="               
        cursor-pointer                
        right-3        
        fixed
        bottom-3                              
        z-20"
      >
        <div
          onClick={() => putProjectData(packageSiteInfo(), match.params.id)}
          className="bg-blue-500 text-white font-semibold py-2 px-3 rounded w-full flex flex-row items-center justify-center"
        >
          <div>Deploy</div>
        </div>
      </div>
      <Renderer pageData={packageSiteInfo() as any} />
    </div>
  );
};

export default Previewer;
