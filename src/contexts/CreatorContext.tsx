import React, {createContext, useEffect, useState} from "react";

type CreatorContextType = {
  layout: Array<any>;
  backgroundImage?: string;
  setBackgroundImage?: (img: string) => void;
  updateColumns: (col: number) => void;
  setLayout: (layout: any) => void;
  columns: number;
};

export const CreatorContext = createContext<CreatorContextType>({
  columns: 0,
  layout: [],
  setLayout: (a: any) => {},
  updateColumns: (a: number) => {},
});

const CreatorRenderer = ({children}: any) => {
  const [layout, setLayout] = useState<any>(null);
  const [columns, setColumns] = useState<number>(3);
  const [colIndex, setColIndex] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://media.istockphoto.com/photos/light-grey-handpainted-textured-backdrop-studio-wall-picture-id1286462240?k=20&m=1286462240&s=612x612&w=0&h=4XBjI-ObesIrCuhJxJb_IOI5bj1-zqAL8B8LF_SRMgI="
  );

  const updateColumns = (increaseBy: number) => {
    setColumns([3, 6, 9][Math.abs(colIndex + increaseBy) % 3]);
    setColIndex(colIndex + increaseBy);
  };

  useEffect(() => {
    let y = 0;
    setLayout(
      !layout
        ? Array.from({length: columns * 4}, (_, i) => i + 1).map(
            (i: number) => {
              if (i % columns === 0 && i !== 0) y += 1;
              return {
                data: {},
                resizeHandles: ["se"],
                i: `${i}`,
                x: i % columns,
                w: 1,
                h: 1,
                y,
              };
            }
          )
        : layout.map((data: any) => {
            return {
              ...data,
              h: data.h,
              w: Math.min(data.w, columns),
            };
          })
    );
  }, [columns]);

  return (
    <CreatorContext.Provider
      value={{
        layout,
        backgroundImage,
        setBackgroundImage,
        updateColumns,
        columns,
        setLayout,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export default CreatorRenderer;
