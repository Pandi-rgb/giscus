import { supabase } from "./client";

export async function uploadPDF(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("research-pdfs")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("research-pdfs").getPublicUrl(fileName);

  return {
    fileName: file.name,

    fileUrl: data.publicUrl,
  };
}
