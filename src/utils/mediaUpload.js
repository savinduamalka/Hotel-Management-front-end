import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const BUCKET_NAME = 'images'; 

export default async function uploadMedia(file) {
  if (!file) {
    toast.error("No file selected. Please choose an image to upload.");
    return Promise.reject("No file selected");
  }

  const fileName = `${Date.now()}-${file.name}`; 
  const filePath = `${fileName}`; 

  try {
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600", 
        upsert: false, 
      });

    if (uploadError) {
      toast.error("Error uploading file. Please try again.");
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      toast.error("Could not get public URL for the uploaded file.");
      throw new Error("Could not retrieve public URL for the uploaded file.");
    }
    
    
    
    return publicUrlData.publicUrl;
  } catch (error) {
    toast.error("An unexpected error occurred during file upload.");
    throw error;
  }
}
