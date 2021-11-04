import Dropzone from "react-dropzone";
import Text from "../components/Text";
import Image from "../components/Image";
import Empty from "../components/Empty";
import {Disclosure} from "@headlessui/react";
import ReactGridLayout from "react-grid-layout";
import React, {useContext, useEffect, useState} from "react";
import {EditorContext} from "../contexts/EditorContext";
import {CreatorContext} from "../contexts/CreatorContext";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import PhotographIcon from "@heroicons/react/solid/PhotographIcon";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/solid/ChevronRightIcon";
import getProjectData from "../api/getPageData";
import LoadingIndicator from "../components/LoadingIndicator";
import {putProjectData} from "../api/putPageData";

const Creator = () => {
  const history = useHistory();
  const [loading, setIsLoading] = useState(true);
  const {deflateEditor} = useContext(EditorContext);
  const match: {params: {id: string}} = useRouteMatch() as any;

  const {
    layout,
    columns,
    setLayout,
    projectId,
    setColIndex,
    creatorWidth,
    onLayoutInit,
    clearCreator,
    setProjectId,
    updateColumns,
    backgroundImage,
    setLargestIndex,
    setBackgroundImage,
  } = useContext(CreatorContext);

  useEffect(() => {
    getWebsiteData();
  }, []);

  const getWebsiteData = async () => {
    if (!projectId) {
      setProjectId(match.params.id);
      const layout = await getProjectData(match.params.id);
      if (layout) {
        setLayout(layout.layout);
        setColIndex(layout.colIndex);
        updateColumns(layout.columns);
        setLargestIndex(layout.largestIndex);
        setBackgroundImage(layout.backgroundImage);
      } else {
        clearCreator();
        onLayoutInit();
      }
    }
    setIsLoading(false);
  };

  return (
    <div
      className="bg-white flex flex-col items-start justify-start w-full h-full overflow-y-scroll overflow-x-hidden relative pt-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {loading && <LoadingIndicator />}
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
          onClick={() => {
            clearCreator();
            history.goBack();
          }}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <div>Back</div>
        </div>
      </div>
      <ChangeBackgroundImage />
      <div
        className="mx-auto relative border rounded"
        style={{width: creatorWidth}}
      >
        {layout && (
          <ReactGridLayout
            rowHeight={creatorWidth / columns}
            width={creatorWidth}
            className="layout"
            margin={[0, 0]}
            layout={layout}
            cols={columns}
            onLayoutChange={(a) =>
              setLayout(
                a.map((data, index) => ({
                  ...layout[index],
                  ...data,
                }))
              )
            }
          >
            {layout?.map(({i, data}: any) => (
              <div
                className="border border-transparent cursor-pointer box-border relative"
                key={i}
              >
                <GridTile onClick={() => deflateEditor(i)} data={data} id={i} />
                <div className=" absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-800 shadow-lg" />
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  );
};

const GridTile = React.memo(
  ({id, data, onClick}: {data: any; id: string; onClick: Function}) => {
    const renderer = () => {
      switch (data.type) {
        case "text":
          return <Text id={id} {...data} />;
        case "image":
          return <Image id={id} {...data} />;
        case "empty":
          return <Empty id={id} />;
      }
    };
    return (
      <div className="w-full h-full rounded" onClick={() => onClick()}>
        {renderer()}
      </div>
    );
  }
);

const ChangeBackgroundImage = () => {
  const {
    columns,
    updateColumns,
    onAddComponent,
    backgroundImage,
    packageSiteInfo,
    setBackgroundImage,
  } = useContext(CreatorContext);
  const match: {params: {id: string}} = useRouteMatch() as any;
  const [loading, setLoading] = useState(false);

  const uploadFiles = (file: File) => {
    const url = URL.createObjectURL(file);
    setBackgroundImage(url);
  };

  const updatePage = async () => {
    setLoading(true);
    await putProjectData(packageSiteInfo() as any, match.params.id);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 select-none w-300 z-20">
      <div className="shadow-md border bg-white border-black rounded relative">
        {loading && <LoadingIndicator />}
        <div className="p-4">
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Panel className="text-black">
                  <Dropzone
                    onDrop={(acceptedFiles) => uploadFiles(acceptedFiles[0])}
                  >
                    {({getRootProps, getInputProps}) => (
                      <div className="m-auto">
                        <div className="font-bold pb-5 mt-3">
                          Background Image
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="m-auto w-20 h-20 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer object-cover">
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              {!backgroundImage && (
                                <PhotographIcon className="w-auto h-12 text-gray-300" />
                              )}
                              {backgroundImage && (
                                <img
                                  src={backgroundImage}
                                  className="w-20 h-20 object-cover rounded"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="flex flex-row justify-between p-5 items-center">
                    <ChevronLeftIcon
                      className="h-8 w-8 cursor-pointer hover:shadow-lg rounded-full border border-black"
                      onClick={() => updateColumns(-1)}
                    />
                    <div className="text-xl">{columns}</div>
                    <ChevronRightIcon
                      className="h-8 w-8 cursor-pointer hover:shadow-lg rounded-full border border-black"
                      onClick={() => updateColumns(+1)}
                    />
                  </div>
                  <div
                    className="rounded cursor-pointer p-2 text-center border border-green-500 text-green-500 hover:bg-green-500 font-bold hover:text-white"
                    onClick={onAddComponent}
                  >
                    Add Tile
                  </div>
                </Disclosure.Panel>
                <Disclosure.Button className="w-full my-3 hover:bg-blue-200 bg-blue-100 p-2 rounded">
                  {open ? "Hide Settings" : "Settings"}
                </Disclosure.Button>
              </>
            )}
          </Disclosure>
          <div className="w-full border "></div>
          <div
            onClick={updatePage}
            className="
              border 
            border-blue-500  
            text-blue-500               
              font-semibold 
              py-2 px-1 rounded 
              w-full flex 
              flex-row 
              items-center 
              justify-center 
              my-2
              duration-200
              cursor-pointer
              hover:shadow-md
              "
          >
            <div>Save Changes</div>
          </div>
          <Link className="shadow-md" to={`/preview/${match.params.id}`}>
            <div className="bg-blue-500 text-white font-semibold py-2 px-1 rounded w-full flex flex-row items-center justify-center">
              <div>Next</div>
              <ChevronRightIcon className="w-5 h-5 mt-0.5 shadow" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Creator;
