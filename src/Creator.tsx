import React, {useContext} from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions from "./helper";
import Text from "./components/Text";
import Image from "./components/Image";
import {EditorContext} from "./contexts/EditorContext";
import {CreatorContext} from "./contexts/CreatorContext";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/solid/ChevronRightIcon";
import Empty from "./components/Empty";

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
            onLayoutChange={(a) =>
              setLayout(
                a.map((data, index) => ({
                  ...layout[index],
                  ...data,
                }))
              )
            }
            rowHeight={widthResolver() / columns}
            width={widthResolver()}
            className="layout"
            margin={[0, 0]}
            layout={layout}
            cols={columns}
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

const ChangeBackgroundImage = () => {
  const {updateColumns, columns} = useContext(CreatorContext);

  return (
    <div className="fixed bottom-2 right-5 p-10 select-none">
      <div className="shadow-lg border backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 p-2 rounded">
        <div className="hover:underline cursor-pointer p-2">
          Background Image
        </div>
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
      </div>
    </div>
  );
};

const GridTile = React.memo(
  ({id, data, onClick}: {data: any; id: string; onClick: Function}) => {
    const renderer = () => {
      switch (data.type) {
        case "text":
          return (
            <Text
              id={id}
              text={data?.text}
              textSize={data?.textSize}
              textStyle={data?.textStyle}
              textColor={data?.textColor}
              textOpacity={data?.textOpacity}
              textVertical={data?.textVertical}
              textAlignment={data?.textAlignment}
              backgroundColor={data?.backgroundColor}
              backgroundOpacity={data?.backgroundOpacity}
            />
          );
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
