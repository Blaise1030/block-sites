import React, {createContext, useState} from "react";
import {Transition} from "@headlessui/react";

type EditorContextType = {
  setEditor: (c: React.ReactElement | null) => void;
};
export const EditorContext = createContext<EditorContextType>({
  setEditor: () => {},
});

const EditorRenderer = ({children}: any) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [editorComponent, setEditorComponent] =
    useState<React.ReactElement | null>();

  const setEditor = (c: React.ReactElement | null) => {
    setEditorComponent(c);
  };

  return (
    <EditorContext.Provider value={{setEditor}}>
      <div className="h-full w-full relative ">
        <div className="absolute left-0 h-full p-4 flex flex-row justify-center items-center">
          <Transition
            show={editorComponent ? true : false}
            enter="transform transition ease-linear duration-100"
            enterFrom="-translate-x-full"
            enterTo="-translate-x-10"
            leave="transform transition ease-linear duration-100"
            leaveFrom="-translate-x-10"
            leaveTo="-translate-x-full"
          >
            <div className="p-2 shadow-md rounded border">
              {editorComponent}
            </div>
          </Transition>
        </div>

        <main className="overflow-y-scroll h-full">
          <button
            className="w-full"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            Click
          </button>
          {children}
        </main>
      </div>
    </EditorContext.Provider>
  );
};

export default EditorRenderer;
