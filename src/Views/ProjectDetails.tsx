import React from "react";
import ArrowLeftIcon from "@heroicons/react/solid/ArrowLeftIcon";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import useWindowDimensions, {widthResolver} from "../helper";

const ProjectDetails = () => {
  const {width} = useWindowDimensions();
  const componentHeight = widthResolver(width) / 4;
  return <div>Hello</div>;
};

export default ProjectDetails;
