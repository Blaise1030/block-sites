import React from "react";
import useWindowDimensions, {widthResolver} from "../helper";

const DefaultLayout = ({children}: any) => {
  const {width} = useWindowDimensions();
  return (
    <div className="w-full h-full">
      <div
        className="grid grid-cols-4 m-auto py-5"
        style={{width: widthResolver(width)}}
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
