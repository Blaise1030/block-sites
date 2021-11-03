import {collection, query, where, onSnapshot} from "firebase/firestore";
import {PAGE} from "./constant";
import {firestore} from "./firebase";

const getUserProject = async (userId: string, onData: Function) => {
  const q = query(collection(firestore, PAGE), where("userId", "==", userId));
  onSnapshot(q, (data) =>
    onData(data.docs.map((doc) => ({websiteId: doc.id, ...doc.data()})))
  );
};

export default getUserProject;
