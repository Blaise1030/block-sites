import React, {useContext, useState} from "react";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import {EditorContext} from "../contexts/EditorContext";
import {CreatorContext} from "../contexts/CreatorContext";

const Empty = ({id}: {id: string}) => {
  const {setEditor} = useContext(EditorContext);
  const inflateEditor = () => setEditor(<EmptyEditor id={id} />, id);

  return (
    <div
      onDoubleClick={inflateEditor}
      className="border-4 w-full h-full bg-white flex flex-col items-center justify-center"
    >
      <PlusIcon className="w-12 h-12 text-gray-300" />
    </div>
  );
};

const EmptyEditor = ({id}: {id: string}) => {
  const {deflateEditor} = useContext(EditorContext);
  const {onComponentUpdate} = useContext(CreatorContext);
  const dropdownData = [
    {
      label: "Text",
      onSelected: () =>
        onComponentUpdate(
          {
            type: "text",
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
          onClick={() => {
            onSelected();
            deflateEditor(null);
          }}
          className="hover:bg-gray-100 p-2 duration-100 rounded cursor-pointer"
          key={label}
        >
          {label}
        </div>
      )
    );
  };

  return (
    <div className="flex flex-col w-50 p-1">
      <div className="font-bold">Pick a component</div>
      <div className="pt-2">{dropdownComponent()}</div>
    </div>
  );
};

export default Empty;
