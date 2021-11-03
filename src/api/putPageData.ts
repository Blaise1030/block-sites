import {getDatabase, ref, set} from "firebase/database";
import {DATABASE_URL, IMAGE, PAGE} from "./constant";
import uploadImageFromBlob from "./uploadImageFromBlob";

const putProjectData = async (pageData: any, projectId: number) => {
  try {
    // Uploads the image and removes all undefined fields
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
    const db = getDatabase(undefined, DATABASE_URL);
    await set(ref(db, `/${PAGE}/${projectId}`), pageData);
  } catch (error) {
    console.log(error);
  }
};

export {putProjectData};
