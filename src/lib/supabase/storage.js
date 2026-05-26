import { createClient } from "@/lib/supabase/client";

export async function uploadPDF(file) {
  const supabase = createClient();

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("research-pdfs")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("research-pdfs").getPublicUrl(fileName);

  return {
    fileName,
    fileUrl: publicUrl,
  };
}
