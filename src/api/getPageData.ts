import {get, child, ref} from "@firebase/database";
import {PAGE} from "./constant";
import {database} from "./firebase";
const getProjectData = async (projectId: string) => {
  try {
    const db = ref(database);
    const data = await get(child(db, `/${PAGE}/${projectId}`));
    if (data.exists()) return data.val();
    else throw "Data not found";
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default getProjectData;
