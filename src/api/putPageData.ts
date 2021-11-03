import {ref, set} from "firebase/database";
import {IMAGE, PAGE} from "./constant";
import uploadImageFromBlob from "./uploadImageFromBlob";
import {database} from "./firebase";

const putProjectData = async (pageData: any, projectId: string) => {
  if (pageData.backgroundImage.length > 0)
    pageData.backgroundImage = await uploadImageFromBlob(
      `${projectId}background`,
      pageData.backgroundImage
    );

  pageData.layout = await Promise.all(
    pageData.layout.map(async (o: any) => {
      Object.keys(o).forEach((key) => o[key] === undefined && delete o[key]);
      if (o?.data?.type === IMAGE && o?.data?.new) {
        o.data.new = false;
        o.data.src = await uploadImageFromBlob(
          `${o.i}${o.x}${o.y}${projectId}`,
          o?.data?.src
        );
      }
      return o;
    })
  );
  await set(ref(database, `/${PAGE}/${projectId}`), pageData);
};

export {putProjectData};
