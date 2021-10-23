import React, {useContext, useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import useWindowDimensions from "./helper";
import "./grid-styles.css";
import Text from "./components/Text";
import Image from "./components/Image";
import {EditorContext} from "./contexts/EditorContext";

const Creator = () => {
  const {width} = useWindowDimensions();
  const [cols, _] = useState<number>(4);
  const [layout, setLayout] = useState<any>();
  const {deflateEditor} = useContext(EditorContext);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"
  );
  const widthResolver = () => (width <= 1024 ? width : 900);

  useEffect(() => {
    setLayout(layoutGenerator());
  }, []);

  const layoutGenerator = () => {
    const layout = [];
    let y = 0;
    ("App.tsx");

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

  // const removeGridItem = (id: string) => {
  //   setLayout(layout.filter(({i}: any) => i !== id));
  // };

  return (
    <div
      className="flex flex-auto w-full py-20 h-full overflow-y-scroll overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ChangeBackgroundImage />
      <div className=" m-auto relative " style={{width: widthResolver()}}>
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
              className="border-2 border-gray-400 cursor-pointer box-border relative"
              key={i}
            >
              {/* <div
                className="absolute top-1 left-1"
                onClick={() => removeGridItem(i)}
              >
                x
              </div> */}
              <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gray-400 shadow-lg" />
              <GridTile
                onClick={() => deflateEditor(i)}
                type={i % 2 == 0 ? "text" : "image"}
                id={i}
              />
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

const ChangeBackgroundImage = () => {
  return (
    <div className="fixed bottom-2 right-5 p-10 cursor-pointer hover:underline">
      <div className="shadow backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 p-2 rounded">
        Edit Background Image
      </div>
    </div>
  );
};

const GridTile = React.memo(
  ({type, id, onClick}: {type: string; id: string; onClick: Function}) => {
    const renderer = (type: string) => {
      switch (type) {
        case "text":
          return (
            <Text
              textVertical="justify-center"
              textAlignment="text-justify"
              backgroundColor="blue"
              backgroundOpacity="200"
              textOpacity="600"
              textStyle="italic"
              textSize="text-xl"
              textColor="green"
              text="Hello"
              id={id}
            />
          );
        case "image":
          return (
            <Image src="https://media.istockphoto.com/photos/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-picture-id1285301614?s=612x612" />
          );
      }
    };
    return (
      <div className="w-full h-full rounded" onClick={() => onClick()}>
        {renderer(type)}
      </div>
    );
  }
);

export default Creator;
