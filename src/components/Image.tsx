import React from "react";

type ImageProps = {
  src: string;
};

const Image = ({src}: ImageProps) => {
  return <img className="object-cover h-full w-full" src={src} alt="img" />;
};

export default Image;
