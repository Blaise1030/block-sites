import React, { useContext, useState } from "react";
import PhotographIcon from "@heroicons/react/solid/PhotographIcon";
import { CreatorContext } from "../contexts/CreatorContext";
import { EditorContext } from "../contexts/EditorContext";
import TextareaAutosize from "react-textarea-autosize";
import RGBAToHexA from "../helper/rgbaHexConverter"
import useWindowDimensions,{widthResolver} from "../helper";
import { ChromePicker } from "react-color";
import Dropzone from 'react-dropzone'
import Slider from "rc-slider";


type TextProps = {
  id: string;
  src?: string;
  text?: string;
  textSize: number;
  textColor?: string;
  backgroundColor?: string;
  textStyle?: "italic" | "underline" | "line-through" | "font-bold";
  textVertical?: "justify-top" | "justify-center" | "justify-end";
  textAlignment?: "text-justify" | "text-center" | "text-left" | "text-right";
};

const Text = React.memo(
  ({
    id,
    src,
    text,
    textSize,
    textColor,
    textStyle,
    textAlignment,
    textVertical,
    backgroundColor,
  }: TextProps) => {
    const [t, setText] = useState(text);
    const [onDoubleClick, setOnDoubleClick] = useState(false);
    const {width} = useWindowDimensions();
    const {creatorWidth} = useContext(CreatorContext);
    const { setEditor } = useContext(EditorContext);

    const inflateEditor = () => {
      setOnDoubleClick(true);
      setEditor(<TextEditor id={id} />, id);
    };

    return (
      <div
        style={{
          color: textColor,
          backgroundSize: "cover",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: backgroundColor,
          fontSize: textSize * (widthResolver(width) / creatorWidth),
          textShadow: src?"0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)":"",
        }}
        onMouseLeave={() => setOnDoubleClick(false)}
        onDoubleClick={inflateEditor}
        className={`
            border
            p-2
            flex
            w-full
            h-full
            flex-col
            ${textStyle}
            ${textVertical}
            ${textAlignment}
        `}
      >
        {!onDoubleClick && (
          <div
            className={`
            p-2
            h-min
            border-none
            resize-none
            ${textStyle}
            outline-none
            bg-transparent
            overflow-y-hidden
            whitespace-pre-line
            ${textAlignment}
          `}
          >
            {t || "Add Text"}
          </div>
        )}
        {onDoubleClick && (
          <TextareaAutosize
            placeholder="Add Text"
            className={`
            p-2
            h-min
            border-none
            resize-none
            ${textStyle}
            outline-none
            bg-transparent
            overflow-y-hidden
            ${textAlignment}
          `}
            autoFocus
            value={t}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
    );
  }
);

export default Text;

const TextEditor = ({ id }: { id: string }) => {
  const { layout, onComponentUpdate, onComponentDelete } = useContext(CreatorContext);
  const { deflateEditor } = useContext(EditorContext);
  const { textColor, backgroundColor, textSize, textAlignment, textVertical, textStyle, src, link} =
    layout.find(({ i }) => i === id)?.data || {src:null, textColor:"", backgroundColor:"", textSize:"", textAlignment:"", textVertical:"", textStyle:"", link:null};
  const [txtSize, setTextSize] = useState(textSize);
  const [txtColor, setTextColor] = useState(textColor);
  const [txtVertical, setTxtVertical] = useState(textVertical);
  const [bgColor, setBackgroundColor] = useState(backgroundColor);
  const [txtAlignment, setTxtAlignment] = useState(textAlignment);
  const [lnk,setLink] = useState(link)
  const [txtFormat,setTxtFormat] = useState(textStyle)
  const [file, setFile] = useState<any>(src);


  const textAlignmentData = [
    {
      icon: 'format_align_left',
      newAlignement: "text-left"
    },
    {
      icon: 'format_align_center',
      newAlignement: "text-center"
    },
    {
      icon: 'format_align_right',
      newAlignement: "text-right"
    },
    {
      icon: 'format_align_justify',
      newAlignement: "text-justify"
    }
  ]

  const textVerticalData = [
    {
      icon: 'vertical_align_bottom',
      newAlignement: "justify-end"
    },
    {
      icon: 'vertical_align_center',
      newAlignement: "justify-center"
    },
    {
      icon: 'vertical_align_top',
      newAlignement: "justify-top"
    },
  ]

  const textFormatterData = [
    {
      icon: 'format_underlined',
      newAlignement: "underline"
    },
    {
      icon: 'strikethrough_s',
      newAlignement: "line-through"
    },
    {
      icon: 'format_bold',
      newAlignement: "font-bold"
    },
    {
      icon: 'format_italic',
      newAlignement: "italic"
    },
  ]

  const updateTextColor = (textColor: string) => {
    setTextColor(textColor);
    onComponentUpdate({ textColor }, id);
  };

  const updateBgColor = (backgroundColor: string) => {
    setBackgroundColor(backgroundColor);
    onComponentUpdate({ backgroundColor }, id);
  };

  const updateTextSize = (textSize: number) => {
    setTextSize(textSize);
    onComponentUpdate({ textSize }, id);
  };

  const updateHAlignment = (alignment: string) => {
    if (txtAlignment !== alignment){
      setTxtAlignment(alignment);
      onComponentUpdate({ textAlignment: alignment }, id);
    }
  };

  const updateVAlignment = (alignment: string) => {
    if (txtVertical !== alignment){
      setTxtVertical(alignment);
      onComponentUpdate({ textVertical: alignment }, id);
    }
  };

  const updateTextFormatter = (newFormat: string) => {
    if (txtFormat === newFormat)
      newFormat = ""
    setTxtFormat(newFormat);
    onComponentUpdate({ textStyle: newFormat }, id);
  };

  const uploadFiles = (newFile: File) => {
    setFile(URL.createObjectURL(newFile));
    onComponentUpdate({
      src: URL.createObjectURL(newFile)
    }, id)
  }

  const updateLink = (newLink:string) =>{
    setLink(newLink);
    onComponentUpdate({
      link: newLink
    }, id)
  }

  return (
    <div className="flex flex-col p-2 drop-shadow select-none">
      <div>
        <div className="font-bold pt-0.5 ">Text Color</div>
        <ChromePicker
          className="mx-auto mt-3"
          onChange={(e) => updateTextColor(RGBAToHexA(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb ?.a || 1))}
          color={txtColor}
        />
        <div className="font-bold pt-3 ">Size</div>
        <Slider value={txtSize} onChange={updateTextSize} />
        <div className="font-bold pt-3 ">Text Styles</div>
        <div className="p-1">
          <div className="flex flex-row select-none w-full justify-evenly p-1">
            {textVerticalData.map(({ icon, newAlignement }) => (<span
              key={icon}
              onClick={() => updateVAlignment(newAlignement)}
              className="material-icons p-2 cursor-pointer hover:shadow-md border rounded mr-1"
            >
              {icon}
            </span>)
            )}
          </div>
          <div className="flex flex-row select-none w-full justify-evenly p-2">
            {textAlignmentData.map(({ icon, newAlignement }) => (<span
              className="material-icons p-2 cursor-pointer hover:shadow-md border rounded mr-1"
              onClick={() => updateHAlignment(newAlignement)}
              key={icon}
            >
              {icon}
            </span>)
            )}
          </div>
          <div className="flex flex-row select-none w-full justify-evenly p-1">
            {textFormatterData.map(({ icon, newAlignement }) => (<span
              className="material-icons p-2 cursor-pointer hover:shadow-md border rounded mr-1"
              onClick={() => updateTextFormatter(newAlignement)}
              key={icon}
            >
              {icon}
            </span>)
            )}
          </div>
        </div>

      </div>
      <div className="py-2">
        <div className="font-bold pt-0.5 ">Background</div>
        <ChromePicker
          onChange={(e) => updateBgColor(RGBAToHexA(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb ?.a || 1))}
          className="mx-auto mt-3"
          disableAlpha={false}
          color={bgColor}
        />
        <div className="font-bold mt-3">Link</div>
        <input
          className="w-full outline-none border-b-2 mb-2 bg-transparent"
          placeholder="Add Link"
          value={lnk} onChange={(e)=>updateLink(e.target.value)}/>
        <Dropzone
        onDrop={acceptedFiles => uploadFiles(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div className="m-auto">
              <div className=" font-bold py-2">Image</div>
              <div className="flex flex-col w-full">
                <div className="m-auto w-20 h-20 border-4 border-dashed rounded flex flex-col items-center justify-center cursor-pointer object-cover">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!src && <PhotographIcon className="w-12 h-12 text-gray-300" />}
                    {src && <img src={file} className="w-20 h-20 object-cover rounded" />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      <div
      onClick={()=>{
        deflateEditor(null)
        onComponentDelete(id)
      }}
      className="mt-1 rounded cursor-pointer p-2 text-center border border-red-500 text-red-500 hover:bg-red-500 font-bold hover:text-white">
        Delete
      </div>
    </div>
  );
};
