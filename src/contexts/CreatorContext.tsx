import React, {createContext, useEffect, useState} from "react";
import useWindowDimensions,{widthResolver} from "../helper";

type CreatorContextType = {
  columns: number;
  layout: Array<any>;
  creatorWidth: number,
  backgroundImage?: string;
  setLayout: (layout: any) => void;
  updateColumns: (col: number) => void;
  onComponentDelete: (id:string) => void;
  setBackgroundImage: (img: string) => void;
  onComponentUpdate: (data: any, id: string) => void;
};

export const CreatorContext = createContext<CreatorContextType>({
  layout: [],
  columns: 0,
  creatorWidth: 0,
  setLayout: () => {},
  updateColumns: () => {},
  onComponentUpdate: () => {},
  onComponentDelete: () => {},
  setBackgroundImage: () => {}
});

const CreatorRenderer = ({children}: any) => {
  const [layout, setLayout] = useState<any>(null);
  const [columns, setColumns] = useState<number>(3);
  const [colIndex, setColIndex] = useState<number>(0);
  const {width} = useWindowDimensions();
  const [creatorWidth,_] = useState<number>(widthResolver(width))
  const [backgroundImage, setBackgroundImage] = useState<string>(
    ""
  );

  const updateColumns = (increaseBy: number) => {
    setColumns([3, 6, 9][Math.abs(colIndex + increaseBy) % 3]);
    setColIndex(colIndex + increaseBy);
  };

  const onColumnsUpdate = () => {
    setLayout(
      layout.map((data: any) => {
        return {
          ...data,
          h: data.h,
          w: Math.min(data.w, columns),
        };
      })
    );
  };

  const onComponentUpdate = (updatedData: any, id: string) => {
    setLayout(
      layout.map((layout: any) => {
        return !(id === layout.i)
          ? layout
          : {
              ...layout,
              data: {
                ...layout.data,
                ...updatedData,
              },
            };
      })
    );
  };

  const onComponentDelete = (id:string) => {
    setLayout(layout.filter(({i}:any)=> i !== id))
  }

  const onLayoutInit = () => {
    let y = 0;
    setLayout(
      Array.from({length: columns * 4}, (_, i) => i + 1).map((i: number) => {
        if (i % columns === 0 && i !== 0) y += 1;
        return {
          data: {
            type: "empty",
          },
          resizeHandles: ["se"],
          i: `${i}`,
          x: i % columns,
          w: 1,
          h: 1,
          y,
        };
      })
    );
  };

  useEffect(() => {
    if (!layout) onLayoutInit();
    else onColumnsUpdate();
  }, [columns]);

  return (
    <CreatorContext.Provider
      value={{
        setBackgroundImage,
        onComponentUpdate,
        onComponentDelete,
        backgroundImage,
        updateColumns,
        creatorWidth,
        setLayout,
        columns,
        layout,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export default CreatorRenderer;