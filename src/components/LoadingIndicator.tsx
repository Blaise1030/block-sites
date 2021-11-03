import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="absolute w-full h-full flex flex-cols items-center justify-center bg-white bg-opacity-80 rounded">
      <div className="bg-white rounded-full w-16 h-16 p-1 flex flex-col items-center justify-center">
        <div className="animate-spin w-14 h-14 bg-gradient-to-r from-blue-500 rounded-full flex flex-col items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
