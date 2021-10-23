import React, {createContext, useState} from "react";
import {Transition} from "@headlessui/react";

type EditorContextType = {
  setEditor: (c: React.ReactElement, id: string) => void;
  deflateEditor: (id: string) => void;
  componentId?: string | null;
};
export const EditorContext = createContext<EditorContextType>({
  deflateEditor: () => {},
  setEditor: () => {},
  componentId: null,
});

const EditorRenderer = ({children}: any) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [componentId, setComponentId] = useState<string | null>();
  const [editorComponent, setEditorComponent] =
    useState<React.ReactElement | null>();

  const setEditor = (c: React.ReactElement, id: string) => {
    setComponentId(id);
    setShowSideBar(true);
    setEditorComponent(c);
  };

  const deflateEditor = (id: string) => {
    if (componentId !== id && editorComponent) {
      console.log(componentId, id);
      setShowSideBar(false);
      setTimeout(() => setEditorComponent(null), 100);
      setComponentId(null);
    }
  };

  return (
    <EditorContext.Provider value={{setEditor, componentId, deflateEditor}}>
      <div className="h-full w-full relative">
        <div className="z-20 absolute left-0 h-full p-4 flex flex-row justify-center items-center ">
          <Transition
            show={showSideBar}
            enter="transform transition ease-linear duration-100"
            enterFrom="-translate-x-full"
            enterTo="-translate-x-10"
            leave="transform transition ease-linear duration-100"
            leaveFrom="-translate-x-10"
            leaveTo="-translate-x-full"
          >
            <div className="p-2 shadow-md rounded border bg-white">
              {editorComponent}
            </div>
          </Transition>
        </div>

        <main className="w-full h-full overflow-y-hidden">{children}</main>
      </div>
    </EditorContext.Provider>
  );
};

export default EditorRenderer;
