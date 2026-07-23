"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function EditGaleriPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    caption: "",
    alt_text: "",
    status: "",
    image_url: "",
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchGaleri = async () => {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        console.error(error);
        toast.error("Gagal memuat data foto galeri.");
        router.push("/admin/dashboard/galeri");
      } else {
        setFormData({
          caption: data.title || "",
          alt_text: "",
          status: "published",
          image_url: data.image_url || "",
        });
        setPreview(data.image_url);
      }
      setIsFetching(false);
    };

    if (params.id) {
      fetchGaleri();
    }
  }, [params.id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent, status: "published" | "draft" | null = null) => {
    e.preventDefault();
    setIsLoading(true);

    const finalStatus = status || formData.status;

    try {
      let finalImageUrl = formData.image_url;

      // 1. Upload foto baru jika ada
      if (imageFile) {
        if (formData.image_url) {
          await deleteImage(formData.image_url);
        }
        finalImageUrl = await uploadImage(imageFile, "galeri");
      }

      // 2. Update database
      const { error } = await supabase
        .from("galeri")
        .update({
          image_url: finalImageUrl,
          title: formData.caption,
        })
        .eq("id", params.id);

      if (error) throw error;

      // 3. Log Aktivitas
      await logActivity("galeri", "UPDATE", `Memperbarui foto galeri: ${formData.caption || params.id}`);

      toast.success("Foto galeri berhasil diperbarui!");
      router.push("/admin/dashboard/galeri");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal memperbarui foto galeri: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };



  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Foto Galeri</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui keterangan atau ganti foto dokumentasi #{params.id}.
          </p>
        </div>
        <Link href="/admin/dashboard/galeri" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      {isFetching ? (
        <div className="admin-panel-card" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
          Memuat data Galeri...
        </div>
      ) : (
      <form onSubmit={(e) => handleSubmit(e)} className="admin-panel-card" style={{ padding: "32px" }}>
        <div className="admin-form-group">
          <label className="admin-label">Foto Saat Ini *</label>
          <div style={{ 
            border: "2px dashed var(--line)", 
            borderRadius: "var(--radius)", 
            padding: preview ? "20px" : "40px 20px", 
            textAlign: "center",
            background: "var(--soft-white)",
            position: "relative",
            transition: "all 0.2s"
          }}>
            {preview ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", boxShadow: "var(--shadow-soft)", objectFit: "cover" }}
                />
                <button 
                  type="button" 
                  className="admin-btn-secondary" 
                  onClick={() => {
                    setPreview(null);
                    setImageFile(null);
                    const fileInput = document.getElementById('foto') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                >
                  Hapus / Ganti Foto
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--muted)" }}>
                <UploadCloud size={48} strokeWidth={1.5} />
                <div style={{ fontWeight: 500, color: "var(--black)" }}>Pilih file gambar atau tarik & letakkan di sini</div>
                <div style={{ fontSize: "13px" }}>Format yang didukung: JPG, PNG, WEBP. Maks: 2MB.</div>
              </div>
            )}
            
            <input 
              type="file" 
              id="foto" 
              accept="image/*" 
              onChange={handleFileChange}
              required={!preview}
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0,
                cursor: "pointer",
                display: preview ? "none" : "block"
              }} 
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="keterangan">Keterangan (Caption) *</label>
          <input 
            type="text" 
            id="keterangan" 
            className="admin-input" 
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            required 
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="alt">Teks Alternatif (Alt Text) *</label>
          <input 
            type="text" 
            id="alt" 
            className="admin-input" 
            value={formData.alt_text}
            onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
            required 
          />
          <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "8px" }}>
            Contoh: "Warga Dusun Jetis sedang melakukan kerja bakti membersihkan selokan."
          </p>
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/galeri" className="admin-btn-secondary">
            Batal
          </Link>
          <button 
            type="button" 
            className="admin-btn-secondary"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isLoading}
          >
            Ubah jadi Draf
          </button>
          <button 
            type="submit" 
            className="admin-btn-primary" 
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Menyimpan..." : "Perbarui Publikasi"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
