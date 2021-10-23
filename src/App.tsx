import React from "react";
import CreatorRenderer from "./contexts/CreatorContext";
import EditorRenderer from "./contexts/EditorContext";
import Creator from "./Creator";

const App = () => {
  return (
    <div className="h-screen w-screen relative">
      <CreatorRenderer>
        <EditorRenderer>
          <Creator />
        </EditorRenderer>
      </CreatorRenderer>
    </div>
  );
};

export default App;
