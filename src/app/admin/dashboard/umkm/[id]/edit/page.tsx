"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function EditUmkmPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    category: "",
    description: "",
    whatsapp_number: "",
    address: "",
    maps_link: "",
    linktree_link: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUmkm = async () => {
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        console.error(error);
        toast.error("Gagal memuat data UMKM atau data tidak ditemukan.");
        router.push("/admin/dashboard/umkm");
      } else {
        setFormData({
          name: data.name,
          owner: data.owner || "",
          category: data.category,
          description: data.description || "",
          whatsapp_number: data.whatsapp_number,
          address: data.address,
          maps_link: data.maps_link || "",
          linktree_link: data.linktree_link || "",
          image_url: data.image_url || "",
        });
      }
      setIsFetching(false);
    };

    if (params.id) {
      fetchUmkm();
    }
  }, [params.id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      // 1. Upload foto baru jika ada
      if (imageFile) {
        // Hapus foto lama jika ada
        if (formData.image_url) {
          await deleteImage(formData.image_url);
        }
        finalImageUrl = await uploadImage(imageFile, "umkm");
      }

      // 2. Update database
      const { error } = await supabase
        .from("umkm")
        .update({
          name: formData.name,
          owner: formData.owner,
          category: formData.category,
          description: formData.description,
          whatsapp_number: formData.whatsapp_number,
          address: formData.address,
          maps_link: formData.maps_link,
          linktree_link: formData.linktree_link,
          image_url: finalImageUrl,
        })
        .eq("id", params.id);

      if (error) throw error;

      // 3. Log Aktivitas
      await logActivity("umkm", "UPDATE", `Memperbarui UMKM: ${formData.name}`);

      toast.success("Data UMKM berhasil diperbarui!");
      router.push("/admin/dashboard/umkm");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal memperbarui UMKM: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Data UMKM</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui informasi UMKM #{params.id} di bawah ini.
          </p>
        </div>
        <Link href="/admin/dashboard/umkm" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      {isFetching ? (
        <div className="admin-panel-card" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
          Memuat data UMKM...
        </div>
      ) : (
      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Utama
        </h2>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="nama">Nama UMKM *</label>
            <input 
              type="text" 
              id="nama" 
              className="admin-input" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="owner">Nama Pemilik *</label>
            <input 
              type="text" 
              id="owner" 
              className="admin-input" 
              value={formData.owner} 
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })} 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kategori">Kategori *</label>
            <select 
              id="kategori" 
              className="admin-input" 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="Makanan & Minuman">Makanan & Minuman</option>
              <option value="Kerajinan Tangan">Kerajinan Tangan</option>
              <option value="Jasa">Jasa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="deskripsi">Deskripsi *</label>
          <textarea 
            id="deskripsi" 
            className="admin-input admin-textarea" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required
          ></textarea>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kontak">Kontak WhatsApp *</label>
            <input 
              type="text" 
              id="kontak" 
              className="admin-input" 
              value={formData.whatsapp_number} 
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })} 
              required 
            />
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="alamat">Alamat / Lokasi</label>
            <input 
              type="text" 
              id="alamat" 
              className="admin-input" 
              value={formData.address} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="maps_link">Link Google Maps (Opsional)</label>
            <input 
              type="url" 
              id="maps_link" 
              className="admin-input" 
              placeholder="Contoh: https://maps.app.goo.gl/..." 
              value={formData.maps_link}
              onChange={(e) => setFormData({ ...formData, maps_link: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="linktree_link">Link Linktree / Website Lain (Opsional)</label>
          <input 
            type="url" 
            id="linktree_link" 
            className="admin-input" 
            placeholder="Contoh: https://linktr.ee/umkm_jetis" 
            value={formData.linktree_link}
            onChange={(e) => setFormData({ ...formData, linktree_link: e.target.value })}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="foto">Ganti Foto Utama (Biarkan kosong jika tidak diubah)</label>
          <input 
            type="file" 
            id="foto" 
            className="admin-input" 
            accept="image/*" 
            style={{ padding: "10px 16px" }} 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
          {formData.image_url && (
            <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>
              Foto saat ini sudah tersimpan. Unggah foto baru untuk menggantinya.
            </div>
          )}
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/umkm" className="admin-btn-secondary">
            Batal
          </Link>
          <button 
            type="submit" 
            className="admin-btn-primary" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Menyimpan..." : "Perbarui Data UMKM"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
