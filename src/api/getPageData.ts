import {getDatabase, get, child, ref} from "@firebase/database";
import {DATABASE_URL, PAGE} from "./constant";

const getProjectData = async (projectId: string) => {
  try {
    const database = ref(getDatabase(undefined, DATABASE_URL));
    const data = await get(child(database, `/${PAGE}/${projectId}`));
    if (data.exists()) return data.val();
    else throw "Data not found";
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default getProjectData;
