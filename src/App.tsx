import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions from "./helper";
import "./grid-styles.css";
import Text from "./components/Text";

const App = () => {
  const { width } = useWindowDimensions();
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

  const removeGridItem = (id: string) => {
    setLayout(layout.filter(({ i }: any) => i !== id));
  };

  return (
    <div className="flex flex-auto w-full py-20">
      <div
        className=" m-auto relative border rounded"
        style={{ width: widthResolver() }}
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
          {layout ?.map(({ i }: any) => (
            <div
              className="border-2 border-gray-400 cursor-pointer box-border relative p-0.5"
              key={i}
            >
              <div
                className="absolute top-1 left-1"
                onClick={() => removeGridItem(i)}
              >
                x
              </div>
              <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gray-400 shadow-lg" />
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
  return (
    <div className="bg-blue-200 w-full h-full rounded">
      <Text
        textVertical="justify-center"
        textAlignment="text-justify"
        textOpacity="600"
        textStyle="italic"
        textSize="text-xl"
        textColor="green"
        text="Hello"
      />
    </div>
  );
});
