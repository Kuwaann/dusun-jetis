import { createClient } from "./client";

export type ModuleType = "akun" | "berita" | "umkm" | "galeri" | "auth" | "sistem";

/**
 * Mencatat log aktivitas admin ke tabel activity_logs
 * @param module Nama modul tempat aktivitas terjadi (akun, berita, umkm, dll)
 * @param action Aksi yang dilakukan (CREATE, UPDATE, DELETE, dll)
 * @param description Deskripsi detail aktivitas
 */
export async function logActivity(module: ModuleType, action: string, description: string) {
  try {
    const supabase = createClient();
    
    // Dapatkan user yang sedang login
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn("Log Aktivitas digagalkan: Tidak ada user yang login.");
      return;
    }

    const { error } = await supabase
      .from("activity_logs")
      .insert({
        user_id: user.id,
        module,
        action,
        description
      });

    if (error) {
      console.error("Gagal mencatat log aktivitas:", error);
    }
  } catch (error) {
    console.error("Kesalahan saat mengeksekusi log aktivitas:", error);
  }
}
