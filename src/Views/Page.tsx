import React, {useState} from "react";
import Renderer, {RendererPropType} from "../components/Renderer";

const Page = () => {
  const [pageData, setPageData] = useState<RendererPropType>();
  return (
    <div className="w-full h-full">
      This is the page
      {pageData && <Renderer pageData={pageData as any} />}
    </div>
  );
};

export default Page;
