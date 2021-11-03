import {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router";
import getProjectData from "../api/getPageData";
import Renderer, {RendererPropType} from "../components/Renderer";

const Page = () => {
  const [pageData, setPageData] = useState<RendererPropType>();
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    const data = await getProjectData(match.params.id);
    if (data) setPageData(data);
    else history.push("/home");
  };

  return (
    <div className="w-full h-full ">
      {pageData && <Renderer pageData={pageData as any} />}
    </div>
  );
};

export default Page;
