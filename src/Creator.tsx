import React, {useContext} from "react";
import Dropzone from 'react-dropzone'
import Text from "./components/Text";
import Image from "./components/Image";
import Empty from "./components/Empty";
import useWindowDimensions from "./helper";
import ReactGridLayout from "react-grid-layout";
import {EditorContext} from "./contexts/EditorContext";
import {CreatorContext} from "./contexts/CreatorContext";
import PhotographIcon from "@heroicons/react/solid/PhotographIcon";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/solid/ChevronRightIcon";

const Creator = () => {
  const {width} = useWindowDimensions();
  const {deflateEditor} = useContext(EditorContext);
  const {columns, backgroundImage, layout, setLayout} =
    useContext(CreatorContext);
  const widthResolver = () => (width <= 1024 ? width : 900);

  return (
    <div
      className="flex flex-col items-start justify-start w-full h-full overflow-y-scroll overflow-x-hidden relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ChangeBackgroundImage />
      <div className=" mx-auto relative" style={{width: widthResolver()}}>
        {layout && (
          <ReactGridLayout
            rowHeight={widthResolver() / columns}
            width={widthResolver()}
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
                <GridTile
                  onClick={() => deflateEditor(i)} data={data} id={i} />
                <div className=" absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-800 shadow-lg" />
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  );
};

const ChangeBackgroundImage = () => {
  const {updateColumns, columns, setBackgroundImage, backgroundImage} = useContext(CreatorContext);

  const uploadFiles = (file:File) =>{
      const url = URL.createObjectURL(file)
      setBackgroundImage(url);
  }


  return (
    <div className="fixed bottom-2 right-5 p-10 select-none">
      <div className="shadow-lg border backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 p-2 rounded">
        <Dropzone
        onDrop={acceptedFiles => uploadFiles(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div className="m-auto">
              <div className=" font-bold py-2">Background Image</div>
              <div className="flex flex-col w-full">
                <div className="m-auto w-20 h-20 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer object-cover">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!backgroundImage && <PhotographIcon className="w-auto h-12 text-gray-300" />}
                    {backgroundImage && <img src={backgroundImage} className="w-20 h-20 object-cover rounded" />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        <div className="flex flex-row justify-between p-5 items-center">
          <ChevronLeftIcon
            className="h-8 w-8 cursor-pointer hover:shadow-lg rounded-full"
            onClick={() => updateColumns(-1)}
          />
          <div className="text-xl">{columns}</div>
          <ChevronRightIcon
            className="h-8 w-8 cursor-pointer hover:shadow-lg rounded-full"
            onClick={() => updateColumns(+1)}
          />
        </div>
        <div
          onClick={() => {

          }}
          className="rounded cursor-pointer p-2 text-center border border-red-500 text-red-500 hover:bg-red-500 font-bold hover:text-white">
          Add Tile
        </div>
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

export default Creator;
