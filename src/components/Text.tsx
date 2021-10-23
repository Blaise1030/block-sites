import React, {useContext, useState} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {EditorContext} from "../contexts/EditorContext";
import {ChromePicker} from "react-color";
import Slider from "rc-slider";
import {CreatorContext} from "../contexts/CreatorContext";

type TextProps = {
  id: string;
  text?: string;
  textSize: number;
  textColor?: string;
  backgroundColor?: string;
  textWeight?: "font-bold";
  textStyle?: "italic" | "underline" | "line-through";
  textVertical?: "justify-top" | "justify-center" | "justify-end";
  textAlignment?: "text-justify" | "text-center" | "text-left" | "text-right";
};

const Text = React.memo(
  ({
    id,
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
    const {setEditor} = useContext(EditorContext);

    const inflateEditor = () => {
      setOnDoubleClick(true);
      setEditor(<TextEditor id={id} />, id);
    };

    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: textSize,
        }}
        onMouseLeave={() => setOnDoubleClick(false)}
        onDoubleClick={inflateEditor}
        className={`
            border
            p-0.5
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
            onHeightChange={(e) => console.log(e)}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
    );
  }
);

export default Text;

const TextEditor = ({id}: {id: string}) => {
  const {layout, onComponentUpdate} = useContext(CreatorContext);
  const {textColor, backgroundColor, textSize, textAlignment, textVertical} =
    layout.find(({i}) => i === id).data as any;
  const [txtSize, setTextSize] = useState(textSize);
  const [txtColor, setTextColor] = useState(textColor);
  const [txtVertical, setTxtVertical] = useState(textVertical);
  const [bgColor, setBackgroundColor] = useState(backgroundColor);
  const [txtAlignment, setTxtAlignment] = useState(textAlignment);

  const updateTextColor = (textColor: string) => {
    setTextColor(textColor);
    onComponentUpdate({textColor}, id);
  };

  const updateBgColor = (backgroundColor: string) => {
    setBackgroundColor(backgroundColor);
    onComponentUpdate({backgroundColor}, id);
  };

  const updateTextSize = (textSize: number) => {
    setTextSize(textSize);
    onComponentUpdate({textSize}, id);
  };

  const updateHAlignment = (alignment: string) => {
    setTxtAlignment(alignment);
    onComponentUpdate({textAlignment: alignment}, id);
  };

  const updateVAlignment = (alignment: string) => {
    setTxtVertical(alignment);
    onComponentUpdate({textVertical: alignment}, id);
  };

  return (
    <div className="flex flex-col p-2">
      <div>
        <div className="font-bold pt-0.5">Text Color</div>
        <ChromePicker
          className="mx-auto mt-3"
          onChange={(e) => updateTextColor(e.hex)}
          color={txtColor}
        />
        <div className="font-bold pt-2">Size</div>
        <Slider value={txtSize} onChange={updateTextSize} />
        <div className="flex flex-row justify-between pt-3">
          <div className="flex flex-row select-none">
            <span
              onClick={() => updateHAlignment("text-left")}
              className="material-icons p-2 cursor-pointer hover:shadow-md border rounded mr-1"
            >
              format_align_left
            </span>
            <span
              onClick={() => updateHAlignment("text-center")}
              className="material-icons p-2 cursor-pointer hover:shadow-md  border rounded mr-1"
            >
              format_align_center
            </span>
            <span
              onClick={() => updateHAlignment("text-right")}
              className="material-icons p-2 cursor-pointer hover:shadow-md  border rounded mr-1"
            >
              format_align_right
            </span>
            <span
              onClick={() => updateHAlignment("text-justify")}
              className="material-icons p-2 cursor-pointer hover:shadow-md  border rounded mr-1"
            >
              format_align_justify
            </span>
          </div>

          <div className="flex flex-row select-none">
            <span
              onClick={() => updateVAlignment("justify-end")}
              className="material-icons p-2 cursor-pointer hover:shadow-md border rounded mr-1"
            >
              vertical_align_bottom
            </span>
            <span
              onClick={() => updateVAlignment("justify-center")}
              className="material-icons p-2 cursor-pointer hover:shadow-md  border rounded mr-1"
            >
              vertical_align_center
            </span>
            <span
              onClick={() => updateVAlignment("justify-top")}
              className="material-icons p-2 cursor-pointer hover:shadow-md  border rounded mr-1"
            >
              vertical_align_top
            </span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="font-bold pt-0.5">Background</div>
        <ChromePicker
          className="mx-auto mt-3"
          onChange={(e) => updateBgColor(e.hex)}
          color={bgColor}
        />
      </div>
    </div>
  );
};
