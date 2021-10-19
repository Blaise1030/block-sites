import React, {useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions from "./helper";
import "./grid-styles.css";

const App = () => {
  const {width} = useWindowDimensions();
  const [cols, _] = useState<number>(5);
  const [layout, setLayout] = useState<any>();
  const widthResolver = () => (width <= 1024 ? width : 900);
  const [gridNum, setGridNum] = useState<number>(cols * cols);

  useEffect(() => {
    setLayout(layoutGenerator());
  }, []);

  const layoutGenerator = () => {
    const layout = [];
    let y = 0;
    for (let i = 0; i < cols * cols; i++) {
      if (i % cols === 0 && i !== 0) y += 1;
      layout.push({
        resizeHandles: ["se"],
        i: `${i}`,
        x: i % cols,
        w: 1,
        h: 1,
        y,
      });
    }
    return layout;
  };

  return (
    <div className="flex flex-auto w-full py-20">
      <div
        className=" m-auto relative border rounded"
        style={{width: widthResolver()}}
      >
        <ReactGridLayout
          onLayoutChange={(a) => setLayout(a)}
          rowHeight={widthResolver() / cols}
          width={widthResolver()}
          className="layout"
          margin={[0, 0]}
          layout={layout}
          cols={cols}
        >
          {layout?.map(({i}: any) => (
            <div
              className={
                "border-2 border-gray-400 cursor-pointer box-border relative p-0.5"
              }
              key={i}
            >
              <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gray-400 shadow-lg">
                {" "}
              </div>
              <GridTile />
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

export default App;

const GridTile = React.memo(() => {
  const color = [
    "bg-indigo-200",
    "bg-green-200",
    "bg-red-200",
    "bg-pink-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-white",
  ][Math.ceil(Math.random() * 6)];
  return (
    <div className={` ${color} w-full h-full text-sm rounded`}>
      This is the grid tile
    </div>
  );
});
