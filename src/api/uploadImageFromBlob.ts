import {getStorage, uploadString, ref} from "firebase/storage";
import axios from "axios";

const uploadImageFromBlob = async (fileName: string, blobUrl: string) => {
  const res = await axios({responseType: "blob", method: "get", url: blobUrl});
  const storage = getStorage();
  const storageRef = ref(storage, fileName);

  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(res.data);
    reader.onloadend = async () => {
      const res = await uploadString(
        storageRef,
        reader.result as any,
        "data_url"
      );
      const bucket = res.ref.bucket;
      const path = res.ref.fullPath;
      resolve(
        `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${path}?alt=media&token=e984961b-1ce8-4771-a4b8-a4d2f0a92ec8`
      );
    };
  });
};

export default uploadImageFromBlob;
