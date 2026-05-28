import { supabase } from "./client";

export async function uploadCover(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("article-covers")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("article-covers")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
