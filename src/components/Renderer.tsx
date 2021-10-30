import React from "react";
import useWindowDimensions, {widthResolver} from "../helper";

export type RendererPropType = {
  pageData: {
    backgroundImage: string;
    largestIndex: number;
    creatorWidth: number;
    colIndex: number;
    columns: number;
    layout: Array<{
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
      moved: boolean;
      static: boolean;
      resizeHandles: Array<string>;
      data: any;
    }>;
  };
};

const Renderer = ({pageData}: RendererPropType) => {
  const {width} = useWindowDimensions();

  const renderer = (data: any, i: any) => {
    switch (data.type) {
      case "text":
        return <DisplayText {...data} id={i} />;
      case "image":
        return <DisplayImage {...data} id={i} />;
      case "empty":
        return <DisplayEmpty />;
    }
  };

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${pageData.backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className={`h-full m-auto grid grid-cols-${pageData.columns}`}
        style={{width: widthResolver(width)}}
      >
        {pageData.layout
          .map((data) => ({...data, order: data.y * 10 + data.x}))
          .sort((data1: any, data2: any) => data1.order - data2.order)
          .map(({w, h, order, data, i}) => (
            <div
              className={`col-span-${w} ${data.link ? "cursor-pointer" : ""}`}
              style={{height: (widthResolver(width) * h) / pageData.columns}}
              onClick={() => {
                if (data.link) window.open(data.link, "_blank");
              }}
              key={order}
            >
              {renderer(data, i)}
            </div>
          ))}
      </div>
    </div>
  );
};

const DisplayEmpty = () => <div className="bg-transparent"></div>;

const DisplayImage = ({
  backgroundColor,
  borderRadius,
  padding,
  src,
  id,
}: any) => (
  <div
    style={{backgroundColor: backgroundColor, padding: `${padding}rem`}}
    className="w-full h-full"
  >
    <img
      className={`object-cover h-full w-full`}
      style={{borderRadius: `${borderRadius}rem`}}
      src={src}
      alt="img"
      id={id}
    />
  </div>
);

const DisplayText = React.memo(
  ({
    backgroundColor,
    textAlignment,
    textVertical,
    creatorWidth,
    textStyle,
    textColor,
    textSize,
    text,
    src,
  }: any) => {
    const {width} = useWindowDimensions();
    return (
      <div
        style={{
          textShadow: src
            ? "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)"
            : "",
          fontSize: textSize * (widthResolver(width) / creatorWidth),
          backgroundColor: backgroundColor,
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          color: textColor,
        }}
        className={`              
        ${textAlignment}                
        ${textVertical}
        ${textStyle}
        flex-col
        h-full
        w-full
        flex
        p-2`}
      >
        <div
          className={`
          whitespace-pre-line
          overflow-y-hidden
          ${textAlignment}
          bg-transparent
          lg:p-2 p-0.5
          outline-none
          ${textStyle}
          border-none
          resize-none
          h-min`}
        >
          {text}
        </div>
      </div>
    );
  }
);

export default Renderer;
