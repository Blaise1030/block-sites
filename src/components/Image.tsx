import React, {useContext} from "react";
import PhotographIcon from "@heroicons/react/solid/PhotographIcon";
import {EditorContext} from "../contexts/EditorContext";

type ImageProps = {
  src?: string;
  id: string;
};

const Image = ({src, id}: ImageProps) => {
  const {setEditor} = useContext(EditorContext);

  const inflateEditor = () => {
    setEditor(<ImageEditor id={id} />, id);
  };

  return (
    <div
      className="w-full h-full border-4"
      onDoubleClick={() => inflateEditor()}
    >
      {src && (
        <img
          id={id}
          className="object-cover h-full w-full"
          src={src}
          alt="img"
        />
      )}
      {!src && (
        <div className="w-full h-full flex flex-col items-center justify-center  backdrop-filter backdrop-blur-lg bg-white bg-opacity-30">
          <PhotographIcon className="w-12 h-12 text-gray-300" />
        </div>
      )}
    </div>
  );
};

const ImageEditor = ({id}: {id: string}) => {
  return <div>This is image</div>;
};

export default Image;
