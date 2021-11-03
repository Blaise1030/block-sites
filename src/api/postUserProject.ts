import {PAGE} from "./constant";
import {firestore} from "./firebase";
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";

const postUserProject = async (userId: string, projectName: string) => {
  const doc = await addDoc(collection(firestore, PAGE), {
    userId,
    projectName,
    creationDate: serverTimestamp(),
    lastEdited: serverTimestamp(),
  });
  return doc.id;
};

export default postUserProject;
