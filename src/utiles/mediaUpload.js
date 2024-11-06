import app from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app); // Removed storage bucket argument

export default function uploadMedia(file) {
  if (!file) {
    console.log("No file selected.");
    return Promise.reject("No file selected");
  }

  const fileRef = ref(storage, file.name);

  return uploadBytes(fileRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((error) => {
      console.error("Error uploading file:", error);
      throw error;
    });
}
