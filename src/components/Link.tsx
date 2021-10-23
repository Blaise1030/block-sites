import React from "react";

type LinkPropsType = {
  src: string;
  id: string;
};

const Link = ({src, id}: LinkPropsType) => {
  return <div>This is the link component</div>;
};

export default Link;
