import React, {Fragment, useContext, useState} from "react";
import PhotographIcon from "@heroicons/react/solid/PhotographIcon";
import {CreatorContext} from "../contexts/CreatorContext";
import {EditorContext} from "../contexts/EditorContext";
import RGBAToHexA from "../helper/rgbaHexConverter";
import {ChromePicker} from "react-color";
import Dropzone from "react-dropzone";
import Slider from "rc-slider";
import {Tab} from "@headlessui/react";

type ImageProps = {
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  src?: string;
  link: string;
  id: string;
};

const Image = ({
  src,
  id,
  borderRadius,
  backgroundColor,
  padding,
}: ImageProps) => {
  const {setEditor} = useContext(EditorContext);

  const inflateEditor = () => {
    setEditor(<ImageEditor id={id} />, id);
  };

  return (
    <div
      style={{backgroundColor: backgroundColor, padding: `${padding}rem`}}
      className="w-full h-full border-4 box-border"
      onDoubleClick={() => inflateEditor()}
    >
      {src && (
        <img
          id={id}
          alt="img"
          src={src}
          className="object-cover h-full w-full"
          style={{borderRadius: `${borderRadius}rem`}}
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
  const {deflateEditor} = useContext(EditorContext);
  const {layout, onComponentUpdate, onComponentDelete} =
    useContext(CreatorContext);
  const {src, borderRadius, backgroundColor, link, padding} = layout.find(
    ({i}) => i === id
  )?.data || {
    link: null,
    src: null,
    borderRadius: null,
    backgroundColor: null,
    padding: null,
  };
  const [brdRadius, setBorderRadius] = useState<number>(borderRadius);
  const [bgColor, setBackgroundColor] = useState(backgroundColor);
  const [pad, setPadding] = useState(padding);
  const [lnk, setLink] = useState(link || "");
  const [file, setFile] = useState<any>(src);

  const uploadFiles = (newFile: File) => {
    setFile(URL.createObjectURL(newFile));
    onComponentUpdate(
      {
        new: true,
        src: URL.createObjectURL(newFile),
      },
      id
    );
  };

  const updateBorderRadius = (newRadius: number) => {
    setBorderRadius(newRadius);
    onComponentUpdate(
      {
        borderRadius: newRadius,
      },
      id
    );
  };

  const updateBackgroundColor = (newColor: string) => {
    setBackgroundColor(newColor);
    onComponentUpdate(
      {
        backgroundColor: newColor,
      },
      id
    );
  };

  const updatePadding = (padding: number) => {
    setPadding(padding);
    onComponentUpdate(
      {
        padding,
      },
      id
    );
  };

  const updateLink = (newLink: string) => {
    setLink(newLink);
    onComponentUpdate(
      {
        link: newLink,
      },
      id
    );
  };

  return (
    <div className="p-2 h-full overflow-auto">
      <Tab.Group>
        <Tab.Panel>
          <div className="p-2">
            <Dropzone onDrop={(acceptedFiles) => uploadFiles(acceptedFiles[0])}>
              {({getRootProps, getInputProps}) => (
                <div className="m-auto">
                  <div className="font-bold pb-1">Image</div>
                  <div className="flex flex-col w-full">
                    <div className="m-auto mt-4 w-40 h-40 border-4 border-dashed rounded flex flex-col items-center justify-center cursor-pointer object-cover">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!src && (
                          <PhotographIcon className="w-12 h-12 text-gray-300" />
                        )}
                        {src && (
                          <img
                            src={file}
                            className="w-30 h-30 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="flex flex-col py-3">
              <div className="font-bold">Border Radius</div>
              <Slider
                onChange={updateBorderRadius}
                value={brdRadius}
                max={15}
                min={0}
              />
            </div>
            <div className="flex flex-col py-3">
              <div className="font-bold">Padding</div>
              <Slider value={pad} min={0} max={5} onChange={updatePadding} />
            </div>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-2">
            <div className="font-bold pt-0.5">Background</div>
            <ChromePicker
              onChange={(e) =>
                updateBackgroundColor(
                  RGBAToHexA(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb?.a || 1)
                )
              }
              className="mx-auto my-3"
              disableAlpha={false}
              color={bgColor}
            />
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-2">
            <div className="font-bold">Link</div>
            <input
              className="w-full outline-none border-b-2 bg-transparent my-3"
              placeholder="Add Link"
              value={lnk}
              onChange={(e) => updateLink(e.target.value)}
            />
            <div
              onClick={() => {
                deflateEditor(null);
                onComponentDelete(id);
              }}
              className="mt-2 rounded cursor-pointer p-2 text-center border border-red-500 text-red-500 hover:bg-red-500 font-bold hover:text-white"
            >
              Delete
            </div>
          </div>
        </Tab.Panel>
        <Tab.List className="grid grid-cols-3 mt-5">
          {["Image", "Background", "Actions"].map((label: string) => (
            <Tab as={Fragment} key={label}>
              {({selected}) => (
                <button
                  className={`${
                    selected
                      ? "bg-blue-500 text-white rounded shadow"
                      : "bg-white text-black hover:bg-blue-100 duration-200"
                  } py-1 px-2`}
                >
                  {label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default Image;
