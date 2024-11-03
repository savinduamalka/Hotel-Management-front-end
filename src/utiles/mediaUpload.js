import app from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);

export default function uploadMedia(file) {
  if (!file) {
    console.log("No file selected.");
    return;
  }

  const fileRef = ref(storage, file.name);

  uploadBytes(fileRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
      })

    })
}