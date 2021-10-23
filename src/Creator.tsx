import React, {useContext, useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions from "./helper";
import "./grid-styles.css";
import Text from "./components/Text";
import Image from "./components/Image";
import {EditorContext} from "./contexts/EditorContext";
import {CreatorContext} from "./contexts/CreatorContext";

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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ChangeBackgroundImage />
      <div className=" mx-auto relative" style={{width: widthResolver()}}>
        {layout && (
          <ReactGridLayout
            onLayoutChange={(a) => setLayout(a)}
            rowHeight={widthResolver() / columns}
            width={widthResolver()}
            className="layout"
            margin={[0, 0]}
            layout={layout}
            cols={columns}
          >
            {layout?.map(({i}: any) => (
              <div
                className="border border-transparent cursor-pointer box-border relative"
                key={i}
              >
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gray-400 shadow-lg" />
                <GridTile
                  onClick={() => deflateEditor(i)}
                  type={i % 2 == 0 ? "text" : "image"}
                  id={i}
                />
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  );
};

const ChangeBackgroundImage = () => {
  const {updateColumns} = useContext(CreatorContext);

  return (
    <div className="fixed bottom-2 right-5 p-10 cursor-pointer">
      <div className="shadow backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 p-2 rounded">
        <div className="hover:underline">Edit Background Image</div>
        <div className="flex flex-row justify-between p-5">
          <div onClick={() => updateColumns(1)}> + </div>
          <div onClick={() => updateColumns(-1)}> - </div>
        </div>
      </div>
    </div>
  );
};

const GridTile = React.memo(
  ({type, id, onClick}: {type: string; id: string; onClick: Function}) => {
    const renderer = (type: string) => {
      switch (type) {
        case "text":
          return (
            <Text
              textVertical="justify-center"
              textAlignment="text-justify"
              backgroundColor="blue"
              backgroundOpacity="200"
              textOpacity="600"
              textStyle="italic"
              textSize="text-xl"
              textColor="green"
              text="Hello"
              id={id}
            />
          );
        case "image":
          return (
            <Image src="https://media.istockphoto.com/photos/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-picture-id1285301614?s=612x612" />
          );
      }
    };
    return (
      <div className="w-full h-full rounded" onClick={() => onClick()}>
        {renderer(type)}
      </div>
    );
  }
);

export default Creator;
