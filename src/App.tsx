import React, {useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import useWindowDimensions from "./helper";

const App = () => {
  const [layout, setLayout] = useState<any>();
  const {width} = useWindowDimensions();
  const widthResolver = () => (width < 728 ? width : 800);

  useEffect(() => {
    setLayout(layoutGenerator());
  }, []);

  const layoutGenerator = () => {
    const layout = [];
    let y = 0;
    for (let i = 0; i < 32; i++) {
      if (i % 4 === 0 && i !== 0) y += 1;
      layout.push({
        y,
        w: 1,
        h: 1,
        i: `${i}`,
        x: i % 4,
        resizeHandles: ["se"],
      });
    }
    return layout;
  };

  return (
    <div className="flex flex-auto">
      <div className="bg-white lg:w-800 w-full m-auto relative">
        <ReactGridLayout
          layout={layout}
          containerPadding={[0, 0]}
          preventCollision={false}
          width={widthResolver()}
          className="layout"
          cols={4}
        >
          {layout?.map(({i}: any) => (
            <div
              key={i}
              className="border-2 cursor-pointer rounded bg-red-50 w-full h-full"
            >
              {i}
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

export default App;

type GridTileProps = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};
const GridTile = ({id, x, y, w, h}: GridTileProps) => {
  return (
    <div
      className=" cursor-pointer border-2 rounded"
      data-grid={{x, y, w, h}}
      key={id}
    >
      This is the grid tile
    </div>
  );
};
