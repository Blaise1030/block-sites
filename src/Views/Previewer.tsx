import React, {useContext} from "react";
import ReactGridLayout from "react-grid-layout";
import {CreatorContext} from "../contexts/CreatorContext";
import useWindowDimensions, {widthResolver} from "../helper";

const Previewer = () => {
  const {columns, backgroundImage, layout, setLayout} =
    useContext(CreatorContext);
  const {width} = useWindowDimensions();
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
      <div className=" mx-auto relative" style={{width: widthResolver()}}>
        {layout && (
          <ReactGridLayout
            rowHeight={widthResolver() / columns}
            width={widthResolver()}
            isResizable={false}
            isDraggable={false}
            className="layout"
            margin={[0, 0]}
            layout={layout}
            cols={columns}
          >
            {layout?.map(({i, data}: any) => (
              <div
                className="border border-transparent box-border relative"
                key={i}
              >
                <DisplayTile data={data} id={i} />
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  );
};

const DisplayTile = React.memo(({id, data}: {data: any; id: string}) => {
  const renderer = () => {
    switch (data.type) {
      case "text":
        return <DisplayText {...data} id={id} />;
      case "image":
        return <DisplayImage {...data} id={id} />;
      case "empty":
        return <DisplayEmpty />;
    }
  };
  return <div className="w-full h-full rounded">{renderer()}</div>;
});

const DisplayImage = ({src, id, borderRadius, backgroundColor, link}: any) => {
  const onClickLink = () => (link ? window.open(link, "_blank") : "");

  return (
    <div style={{backgroundColor: backgroundColor}} className="w-full h-full">
      <img
        id={id}
        alt="img"
        src={src}
        onClick={onClickLink}
        style={{borderRadius: `${borderRadius}rem`}}
        className={`object-cover h-full w-full p-1 ${
          link ? "cursor-pointer" : ""
        }`}
      />
    </div>
  );
};

const DisplayText = React.memo(
  ({
    src,
    text,
    link,
    textSize,
    textColor,
    textStyle,
    textAlignment,
    textVertical,
    backgroundColor,
    creatorWidth,
  }: any) => {
    const {width} = useWindowDimensions();
    const onClickLink = () => (link ? window.open(link, "_blank") : "");
    return (
      <div
        onClick={onClickLink}
        style={{
          color: textColor,
          backgroundSize: "cover",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: backgroundColor,
          fontSize: textSize * (widthResolver(width) / creatorWidth),
          textShadow: src
            ? "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)"
            : "",
        }}
        className={`              
              p-2
              flex
              w-full
              h-full
              flex-col
              ${textStyle}
              ${textVertical}
              ${textAlignment}
              ${link ? "cursor-pointer" : ""}
          `}
      >
        <div
          className={`
              lg:p-2 p-0.5
              h-min
              border-none
              resize-none
              ${textStyle}
              outline-none
              bg-transparent
              overflow-y-hidden
              whitespace-pre-line
              ${textAlignment}
            `}
        >
          {text}
        </div>
      </div>
    );
  }
);

const DisplayEmpty = () => {
  return <div className="bg-transparent"></div>;
};

export default Previewer;
