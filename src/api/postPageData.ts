import {getDatabase, ref, set} from "firebase/database";
import {DATABASE_URL, IMAGE, PAGE} from "./constant";
import uploadImageFromBlob from "./uploadImageFromBlob";

const postPageData = async (
  pageData: any,
  userId: number,
  projectName: string
) => {
  const currentTime = Date.now();

  try {
    pageData.layout = await Promise.all(
      pageData.layout.map(async (o: any) => {
        // Remove undefined fields
        Object.keys(o).forEach((key) => o[key] === undefined && delete o[key]);
        // Upload Files
        if (o?.data?.type === IMAGE && o?.data?.new) {
          o.data.src = await uploadImageFromBlob(
            `${o.x}${o.y}${currentTime}`,
            o?.data?.src
          );
          o.data.new = false;
        }
        return o;
      })
    );
    const db = getDatabase(undefined, DATABASE_URL);
    await set(ref(db, `/${PAGE}/${currentTime}${userId}`), {
      pageId: `${currentTime}${userId}`,
      creationDate: currentTime,
      projectName,
      pageData,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export {postPageData};
