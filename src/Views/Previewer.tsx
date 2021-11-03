import {useContext, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {CreatorContext} from "../contexts/CreatorContext";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import Renderer from "../components/Renderer";
import {putProjectData} from "../api/putPageData";
import Modal from "../components/Modal";

const Previewer = () => {
  const {packageSiteInfo} = useContext(CreatorContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const updatePage = async () => {
    setLoading(true);
    await putProjectData(packageSiteInfo() as any, match.params.id);
    setLoading(false);
  };
  const AddProjectModal = () => {
    return (
      <div className="flex flex-col text-center">
        <div className="flex flex-row items-center justify-center mb-2">
          <span className="flex items-center justify-center h-3 w-3">
            <span
              className={`${
                loading
                  ? "animate-ping bg-red-400 mb-0.5 mr-0.5"
                  : "bg-green-400"
              } absolute h-3.5 w-3.5 rounded-full  opacity-75`}
            ></span>
            <span
              className={`${
                loading ? "bg-red-500" : "bg-green-500"
              } relative rounded-full h-2 w-2 `}
            ></span>
          </span>
          <div className="font-bold ml-3">
            {loading ? "Deploying Your Site" : "Your site has been deployed 🎉"}
          </div>
        </div>
        <div className="text-gray-400 text-md p-2">
          {loading
            ? "Juz kidding, we are just saving your data in the database :). Wait."
            : `Deployed to ${match.params.id}`}
        </div>
        <div
          onClick={() => history.push(`/page/${match.params.id}`)}
          className="w-full bg-blue-400 text-white p-3 rounded mt-2 cursor-pointer hover:bg-blue-300 duration-200"
        >
          Check It Out
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full relative">
      <div
        className="               
        cursor-pointer                
        left-3        
        fixed
        top-3                              
        z-10"
      >
        <div
          className="bg-blue-500 text-white font-semibold py-1 pl-1 pr-2 rounded w-full flex flex-row items-center justify-center"
          onClick={() => history.goBack()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <div>Back</div>
        </div>
      </div>

      <Modal
        onBlur={false}
        showWhiteBackground={true}
        modal={<AddProjectModal id={match.params.id} />}
        button={
          <div
            className="               
          cursor-pointer                
          right-3        
          fixed
          bottom-3                              
          z-10"
          >
            <div
              onClick={updatePage}
              className="bg-blue-500 text-white font-semibold py-2 px-3 rounded w-full flex flex-row items-center justify-center"
            >
              <div>Deploy</div>
            </div>
          </div>
        }
      />
      <Renderer pageData={packageSiteInfo() as any} />
    </div>
  );
};

export default Previewer;
