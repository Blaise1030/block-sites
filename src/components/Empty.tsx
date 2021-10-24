import React, {useContext} from "react";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import {EditorContext} from "../contexts/EditorContext";
import {CreatorContext} from "../contexts/CreatorContext";

const Empty = ({id}: {id: string}) => {
  const {setEditor} = useContext(EditorContext);
  const inflateEditor = () => setEditor(<EmptyEditor id={id} />, id);

  return (
    <div
      onDoubleClick={inflateEditor}
      className="border-4 w-full h-full backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 flex flex-col items-center justify-center"
    >
      <PlusIcon className="w-12 h-12 text-gray-300" />
    </div>
  );
};

const EmptyEditor = ({id}: {id: string}) => {
  const {deflateEditor} = useContext(EditorContext);
  const {onComponentUpdate,onComponentDelete} = useContext(CreatorContext);
  const dropdownData = [
    {
      label: "Text",
      onSelected: () =>
        onComponentUpdate(
          {
            type: "text",
            textSize: 14,
            textColor: "black",
            backgroundColor: "white",
            textAlignment: "text-justify",
            textVertical: "justify-center",
          },
          id
        ),
    },
    {
      label: "Image",
      onSelected: () =>
        onComponentUpdate(
          {
            type: "image",
          },
          id
        ),
    },
  ];

  const dropdownComponent = () => {
    return dropdownData.map(
      ({label, onSelected}: {label: string; onSelected: Function}) => (
        <div
          key={label}
          className="hover:bg-gray-100 p-2 duration-100 rounded cursor-pointer"
          onClick={() => {
            onSelected();
            deflateEditor(null);
          }}
        >
          {label}
        </div>
      )
    );
  };

  return (
    <div className="flex flex-col w-50 p-2">
      <div className="font-bold underline">Pick a component</div>
      <div className="pt-2">{dropdownComponent()}</div>
      <div
      onClick={()=>{
        deflateEditor(null)
        onComponentDelete(id)
      }}
      className="mt-4 rounded cursor-pointer p-2 text-center border border-red-500 text-red-500 hover:bg-red-500 font-bold hover:text-white">
        Delete
      </div>
    </div>
  );
};

export default Empty;
