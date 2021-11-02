import React, {ReactElement, useContext, useEffect, useState} from "react";
import useWindowDimensions, {widthResolver} from "../helper";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import {AuthenticationContext} from "../contexts/AuthContext";
import Modal from "../components/Modal";
import {Link, useRouteMatch} from "react-router-dom";
const Project = () => {
  const {width} = useWindowDimensions();
  const {userData, projects, loadingData} = useContext(AuthenticationContext);
  let match = useRouteMatch();

  return (
    <>
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
      <div className="grid grid-cols-4 col-span-4 relative">
        {loadingData && (
          <div className="absolute w-full h-full flex flex-cols items-center justify-center mt-5">
            <div className="border shadow-md bg-white rounded-full w-16 h-16 p-1 flex flex-col items-center justify-center">
              <div className="animate-spin w-14 h-14 bg-gradient-to-r from-blue-500 rounded-full flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {projects.map((id, index) => (
          <div
            key={id}
            style={{
              height:
                width < 1024
                  ? widthResolver(width) / 2
                  : widthResolver(width) / 4,
            }}
            className={`
          hover:shadow-md          
          p-2 m-1       
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
                  className="bg-blue-500 text-white py-2 px-3 rounded w-full hover:shadow-md duration-200"
                  to={`page/${id}`}
                >
                  Checkout
                </Link>
                <Link
                  className="bg-blue-300 text-blue-600 py-2 px-3 rounded w-full mt-1 hover:shadow-md duration-200"
                  to={`create/${id}`}
                >
                  Edit
                </Link>
                <div className="bg-red-300 text-red-700 py-2 px-3 rounded w-full mt-1 hover:shadow-md duration-200">
                  Delete
                </div>
              </div>
            </div>
            <div className="font-bold text-xl">Project Name</div>
          </div>
        ))}
      </div>

      <div
        className="    
          m-1
          border-2
          rounded-lg
          select-none
          col-span-4
          lg:col-span-2
          border-dashed
          border-black
          cursor-pointer 
        "
        style={{
          height:
            width < 1024 ? widthResolver(width) / 2 : widthResolver(width) / 4,
        }}
      >
        <Modal
          modal={<AddProjectModal />}
          button={
            <div
              className="h-full p-2 w-full col-span-4 lg:col-span-2 flex items-center justify-center"
              style={{
                height:
                  width < 1024
                    ? widthResolver(width) / 2
                    : widthResolver(width) / 4,
              }}
            >
              <PlusIcon className="w-10 h-10 text-black" />
            </div>
          }
        />
      </div>
    </>
  );
};

export default Project;

const AddProjectModal = ({closeModal}: any) => {
  return (
    <div className="flex flex-col font-bold">
      <div> Project Name</div>
      <input
        className="outline-none p-2 px-0 border-b-2 border-gray-400 my-2"
        placeholder="Name"
        type="text"
      />
      <div
        onClick={closeModal}
        className="ml-auto bg-blue-500 text-white shadow py-2 px-4 rounded mt-2 w-min cursor-pointer hover:shadow-lg duration-200"
      >
        Start
      </div>
    </div>
  );
};
