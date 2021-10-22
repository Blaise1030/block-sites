import React, {useState} from "react";
import TextareaAutosize from "react-textarea-autosize";

import {
  backgroundColorComposer,
  textColorComposer,
} from "../helper/colorComposer";

type TextProps = {
  textColor?:
    | "purple"
    | "indigo"
    | "red"
    | "blue"
    | "green"
    | "black"
    | "pink"
    | "gray";
  text: string;
  backgroundOpacity?:
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800";
  backgroundColor?:
    | "purple"
    | "indigo"
    | "red"
    | "blue"
    | "green"
    | "black"
    | "pink"
    | "gray";
  textWeight?: "font-bold";
  textStyle?: "italic" | "underline" | "line-through";
  textVertical?: "justify-top" | "justify-center" | "justify-end";
  textOpacity?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800";
  textAlignment?: "text-justify" | "text-center" | "text-left" | "text-right";
  textSize?:
    | "text-sm"
    | "text-xs"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl";
};

const Text = React.memo(
  ({
    text,
    textStyle,
    textColor = "gray",
    textOpacity = "500",
    textSize = "text-base",
    textAlignment = "text-left",
    textVertical = "justify-center",
    backgroundColor = "gray",
    backgroundOpacity = "100",
  }: TextProps) => {
    const [t, setText] = useState(text);
    const [onDoubleClick, setOnDoubleClick] = useState(false);

    return (
      <div
        onDoubleClick={() => setOnDoubleClick(true)}
        className={`
            p-0.5
            flex
            w-full
            h-full
            flex-col
            ${textSize}
            ${textStyle}
            ${textVertical}
            ${textAlignment}         
            ${backgroundColorComposer({
              color: backgroundColor,
              opacity: backgroundOpacity,
            })}               
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
            ${textColorComposer({
              color: textColor,
              opacity: textOpacity,
            })}            
          `}
          >
            {t}
          </div>
        )}
        {onDoubleClick && (
          <TextareaAutosize
            autoFocus
            value={t}
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
            ${textColorComposer({
              color: textColor,
              opacity: textOpacity,
            })}            
          `}
            onHeightChange={(e) => console.log(e)}
            onMouseLeave={(e) => setOnDoubleClick(false)}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
    );
  }
);

export default Text;
