import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { EditorContext } from "../contexts/EditorContext";
import { ChromePicker } from "react-color";
import Slider from "rc-slider";
import { CreatorContext } from "../contexts/CreatorContext";
import RGBAToHexA from "../helper/rgbaHexConverter"

type TextProps = {
  id: string;
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
    const { setEditor } = useContext(EditorContext);

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
            onHeightChange={(e) => console.log(e)}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
    );
  }
);

export default Text;

const TextEditor = ({ id }: { id: string }) => {
  const { layout, onComponentUpdate } = useContext(CreatorContext);
  const { textColor, backgroundColor, textSize, textAlignment, textVertical, textStyle} =
    layout.find(({ i }) => i === id).data as any;
  const [txtSize, setTextSize] = useState(textSize);
  const [txtColor, setTextColor] = useState(textColor);
  const [txtVertical, setTxtVertical] = useState(textVertical);
  const [bgColor, setBackgroundColor] = useState(backgroundColor);
  const [txtAlignment, setTxtAlignment] = useState(textAlignment);
  const [txtFormat,setTxtFormat] = useState(textStyle)

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

  return (
    <div className="flex flex-col p-2 drop-shadow select-none">
      <div>
        <div className="font-bold pt-0.5 underline">Text Color</div>
        <ChromePicker
          className="mx-auto mt-3"
          onChange={(e) => updateTextColor(RGBAToHexA(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb ?.a || 1))}
          color={txtColor}
        />
        <div className="font-bold pt-3 underline">Size</div>
        <Slider value={txtSize} onChange={updateTextSize} />
        <div className="font-bold pt-3 underline">Text Styles</div>
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
        <div className="font-bold pt-0.5 underline">Background</div>
        <ChromePicker
          onChange={(e) => updateBgColor(RGBAToHexA(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb ?.a || 1))}
          className="mx-auto mt-3"
          disableAlpha={false}
          color={bgColor}
        />
      </div>
    </div>
  );
};
