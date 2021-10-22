import React from "react";
import EditorRenderer from "./contexts/EditorContext";
import Creator from "./Creator";

const App = () => {
  return (
    <div className="h-screen w-screen relative">
      <EditorRenderer>
        <Creator />
      </EditorRenderer>
    </div>
  );
};

export default App;
