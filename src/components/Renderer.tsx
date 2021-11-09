import React, {useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions, {widthResolver} from "../helper";
import {TEXT, IMAGE, EMPTY, NEWSLETTER} from "../api/constant";
import Modal from "./Modal";

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

  const renderer = (data: any, i: any, gridInfo: any) => {
    switch (data.type) {
      case TEXT:
        return <DisplayText {...data} id={i} />;
      case IMAGE:
        return <DisplayImage {...data} id={i} />;
      case NEWSLETTER:
        return <DisplayNewsletter {...data} id={i} {...gridInfo} />;
      case EMPTY:
        return <DisplayEmpty />;
    }
  };

  return (
    <div
      className="w-full h-full overflow-auto bg-black"
      style={{
        backgroundImage: `url(${pageData.backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="mx-auto relative rounded"
        style={{width: widthResolver(width)}}
      >
        <ReactGridLayout
          rowHeight={widthResolver(width) / pageData.columns}
          layout={pageData.layout as any}
          width={widthResolver(width)}
          cols={pageData.columns}
          isDraggable={false}
          isResizable={false}
          className="layout"
          margin={[0, 0]}
        >
          {pageData.layout.map(({w, h, data, i}: any) => (
            <div
              key={i}
              className={`${data.link ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (data.link) window.open(data.link, "_blank");
              }}
              style={{
                height: (widthResolver(width) * h) / pageData.columns,
                width: (widthResolver(width) * w) / pageData.columns,
              }}
            >
              {renderer(data, i, {w, h, data, i})}
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

const DisplayEmpty = React.memo(() => <div className="bg-transparent"></div>);
const DisplayImage = React.memo(
  ({backgroundColor, borderRadius, padding, src, id}: any) => (
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
  )
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
    padding,
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
          padding: `${padding}rem`,
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
const DisplayNewsletter = React.memo(({columns, w}: any) => {
  const showButtonOnly = w <= columns / 2;

  return (
    <div className="flex flex-row w-full items-center justify-center h-full">
      {!showButtonOnly ? (
        <div className="flex flex-row w-full items-center justify-center">
          <input
            className="border rounded mr-1 border-black outline-none p-1.5 w-1/3"
            type="text"
          />
          <div className="border-gray border bg-black cursor-pointer text-white py-2 px-3 rounded hover:shadow-lg duration-200">
            Subscribe
          </div>
        </div>
      ) : (
        <Modal
          modal={<DisplayNewsletterModal />}
          showWhiteBackground
          button={
            <div className="border-gray border bg-black cursor-pointer text-white py-2 px-3 rounded hover:shadow-lg duration-200 text-xl">
              Subscribe
            </div>
          }
        />
      )}
    </div>
  );
});

const DisplayNewsletterModal = ({closeModal}: any) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="text-2xl font-bold">Subscribe</div>
      <input
        className="border-b border-black outline-none py-2 my-2 px-1"
        type="email"
        required
      />
      <input
        className="w-min py-2 px-3 text-white bg-black rounded hover:shadow-md cursor-pointer ml-auto"
        type="submit"
      />
    </form>
  );
};

export default Renderer;
