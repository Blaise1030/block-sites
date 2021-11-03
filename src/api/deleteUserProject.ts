import {doc, deleteDoc} from "firebase/firestore";
import {PAGE} from "./constant";
import {firestore, database} from "./firebase";
import {ref, remove} from "firebase/database";

const deleteUserProject = async (pageId: string) => {
  await deleteDoc(doc(firestore, PAGE, pageId));
  await remove(ref(database, `${PAGE}/${pageId}`));
};

export default deleteUserProject;
