import {doc, deleteDoc} from "firebase/firestore";
import {PAGE} from "./constant";
import {firestore} from "./firebase";

const deleteUserProject = async (pageId: string) =>
  await deleteDoc(doc(firestore, PAGE, pageId));

export default deleteUserProject;
