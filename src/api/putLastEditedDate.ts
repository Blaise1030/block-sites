import {doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {PAGE} from "./constant";
import {firestore} from "./firebase";

const putLastEdited = async (pageId: string) => {
  const userProject = doc(firestore, PAGE, pageId);
  await updateDoc(userProject, {
    lastEdited: serverTimestamp(),
  });
};

export default putLastEdited;
