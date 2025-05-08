import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const BUCKET_NAME = 'images'; 

export default async function uploadMedia(file) {
  if (!file) {
    console.log("No file selected.");
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
      console.error("Error uploading file to Supabase:", uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error("Error getting public URL from Supabase:", publicUrlData);
      throw new Error("Could not retrieve public URL for the uploaded file.");
    }
    
    console.log("File uploaded successfully:", data);
    console.log("Public URL:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;

  } catch (error) {
    console.error("Error in uploadMedia function:", error);
    throw error;
  }
}
