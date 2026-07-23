import { createClient } from "./client";

/**
 * Mengunggah file gambar ke Supabase Storage (bucket: images)
 * @param file Objek File dari input HTML
 * @param folder Nama folder (opsional, misal: 'umkm' atau 'berita')
 * @returns URL publik gambar yang berhasil diunggah
 */
export async function uploadImage(file: File, folder: string = "general"): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Gagal mengunggah gambar:", error);
    throw new Error("Gagal mengunggah gambar: " + error.message);
  }

  // Mendapatkan Public URL
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Menghapus file gambar dari Supabase Storage
 * @param imageUrl URL publik gambar yang ingin dihapus
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const supabase = createClient();
    
    // Mengekstrak path file dari URL publik Supabase
    // Contoh URL: https://xyz.supabase.co/storage/v1/object/public/images/umkm/123-abc.jpg
    const bucketUrl = "/storage/v1/object/public/images/";
    const pathIndex = imageUrl.indexOf(bucketUrl);
    
    if (pathIndex !== -1) {
      const filePath = imageUrl.substring(pathIndex + bucketUrl.length);
      
      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);
        
      if (error) {
        console.error("Gagal menghapus gambar:", error);
      }
    }
  } catch (err) {
    console.error("Error dalam proses penghapusan gambar:", err);
  }
}
