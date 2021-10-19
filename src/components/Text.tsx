import React, {useState} from "react";

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
  }: TextProps) => {
    const [t, setText] = useState(text);

    return (
      <div
        className={`        
            flex
            w-full 
            h-full 
            flex-col            
            ${textSize}
            ${textStyle}
            ${textVertical} 
            ${textAlignment}            
        `}
      >
        <textarea
          className={`                        
            p-2                                            
            h-min                                  
            border-none            
            resize-none 
            ${textStyle}
            outline-none        
            bg-transparent                  
            ${textAlignment}            
            overflow-y-hidden
            text-${textColor}-${textOpacity}
            `}
          onChange={(e) => setText(e.target.value)}
          value={t}
          rows={1}
        ></textarea>
      </div>
    );
  }
);

export default Text;
