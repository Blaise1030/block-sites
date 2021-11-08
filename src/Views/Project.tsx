import {useContext, useState} from "react";
import Modal from "../components/Modal";
import postUserProject from "../api/postUserProject";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import deleteUserProject from "../api/deleteUserProject";
import useWindowDimensions, {widthResolver} from "../helper";
import {AuthenticationContext} from "../contexts/AuthContext";
import LoadingIndicator from "../components/LoadingIndicator";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {firebaseTimestampConverter} from "../helper/firebaseTimestampConverter";

const MAX_PROJECTS = 3;

const Project = () => {
  const {width} = useWindowDimensions();
  const {userData, projects, loadingData} = useContext(AuthenticationContext);
  let match = useRouteMatch();
  const componentHeight = {
    height: width < 1024 ? widthResolver(width) / 2 : widthResolver(width) / 4,
  };
  const isMax = () => projects.length >= MAX_PROJECTS;
  const deleteProj = (pageId: string) => deleteUserProject(pageId);

  return (
    <>
      <div className="grid grid-cols-4 col-span-4 relative">
        <div
          className="col-span-1 text-center flex items-center justify-center font-bold text-lg p-4 select-none"
          style={{height: widthResolver(width) / 4}}
        >
          <Link to={`${match.url}/profile`}>
            <img
              className="object-cover rounded-full h-full w-full shadow-lg border border-black"
              src={userData?.img}
              alt=""
            />
          </Link>
        </div>
        <div
          className="col-span-3 flex items-center font-bold text-2xl text-left p-3 select-none justify-left"
          style={{height: widthResolver(width) / 4}}
        >
          Your Projects
        </div>
      </div>

      <div className="grid grid-cols-4 col-span-4 relative">
        <div
          className={`
          m-1
          border-2
          rounded-lg
          select-none
          col-span-4
          lg:col-span-2
          border-dashed
          border-black
          ${!isMax() ? "" : "opacity-50"}
          ${!isMax() ? "cursor-pointer" : ""}`}
          style={componentHeight}
        >
          {!isMax() ? (
            <Modal
              showWhiteBackground={true}
              modal={<AddProjectModal />}
              button={<AddProjectComponent componentHeight={componentHeight} />}
            />
          ) : (
            <AddProjectComponent componentHeight={componentHeight} />
          )}
        </div>
        {loadingData && <LoadingIndicator />}
        {projects.map((project) => (
          <div
            key={project.websiteId}
            style={componentHeight}
            className={`
          hover:shadow-md          
          p-4 m-1       
          relative
          border
          col-span-4
          rounded-lg
          border-black                 
          text-black
          lg:col-span-2          
          cursor-pointer flex          
          items-end select-none`}
          >
            <div
              className="
            rounded
            flex
            top-0
            left-0    
            w-full          
            h-full 
            flex-col
            absolute
            opacity-0
            bg-black
            items-center
            duration-200
            bg-opacity-10
            justify-center            
            hover:opacity-100 
            "
            >
              <div className="w-2/5 h-full flex flex-col items-center justify-center text-center">
                <Link
                  className="bg-black text-white py-2 px-3 rounded w-full hover:shadow-md duration-200"
                  to={{
                    pathname: `/page/${project.websiteId}`,
                    state: {websiteId: project.websiteId},
                  }}
                >
                  Checkout
                </Link>
                <Link
                  className="bg-gray-300 text-gray-600 py-2 px-3 rounded w-full mt-1 hover:shadow-md duration-200"
                  to={{
                    pathname: `/create/${project.websiteId}`,
                    state: {websiteId: project.websiteId},
                  }}
                >
                  Edit
                </Link>
                <div
                  onClick={() => deleteProj(project.websiteId)}
                  className="bg-red-300 text-red-700 py-2 px-3 rounded w-full mt-1 hover:shadow-md duration-200"
                >
                  Delete
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl">{project.projectName}</div>
              <div className="text-gray-400 text-xs">
                <span className="font-bold">Last modified </span>
                <span>
                  {firebaseTimestampConverter(project.lastEdited)
                    .toString()
                    .slice(0, 25)}
                </span>
              </div>
              <div className="text-gray-500 text-md mt-1">
                {project.websiteId}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Project;

const AddProjectComponent = ({componentHeight}: {componentHeight: any}) => {
  return (
    <div
      className="h-full p-2 w-full col-span-4 lg:col-span-2 flex items-center justify-center"
      style={componentHeight}
    >
      <PlusIcon className="w-10 h-10 text-black" />
    </div>
  );
};

const AddProjectModal = ({closeModal}: any) => {
  const {userData} = useContext(AuthenticationContext);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const createNewProject = async () => {
    // Creates a new project in the database
    if (projectName.length > 0) {
      setLoading(true);
      const id = await postUserProject(userData?.id as any, projectName);
      setLoading(false);
      closeModal();
      history.push(`create/${id}`);
    }
  };

  return (
    <div className="flex flex-col font-bold relative">
      {loading && <LoadingIndicator />}
      <div> Project Name</div>
      <input
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
        className="outline-none p-2 px-0 border-b-2 border-gray-400 my-2"
        placeholder="Name"
        type="text"
      />
      <div
        onClick={createNewProject}
        className="ml-auto bg-black text-white shadow py-2 px-4 rounded mt-2 w-min cursor-pointer hover:shadow-lg duration-200"
      >
        Start
      </div>
    </div>
  );
};
