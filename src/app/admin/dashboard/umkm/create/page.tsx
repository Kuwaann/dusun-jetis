"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function CreateUmkmPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    category: "",
    description: "",
    whatsapp_number: "",
    address: "",
    maps_link: "",
    linktree_link: "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      let image_url = null;

      // 1. Upload image if exists
      if (imageFile) {
        image_url = await uploadImage(imageFile, "umkm");
      }

      // 2. Insert to database
      const { error } = await supabase
        .from("umkm")
        .insert({
          name: formData.name,
          owner: formData.owner,
          category: formData.category,
          description: formData.description,
          whatsapp_number: formData.whatsapp_number,
          address: formData.address,
          maps_link: formData.maps_link,
          linktree_link: formData.linktree_link,
          image_url: image_url,
        });

      if (error) throw error;

      // 3. Log Activity
      await logActivity("umkm", "CREATE", `Menambahkan UMKM baru: ${formData.name}`);

      toast.success("Data UMKM berhasil ditambahkan!");
      router.push("/admin/dashboard/umkm");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal menambahkan UMKM: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Tambah UMKM Baru</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Lengkapi formulir di bawah ini untuk menambahkan data UMKM.
          </p>
        </div>
        <Link href="/admin/dashboard/umkm" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

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
              placeholder="Contoh: Keripik Bu Tejo" 
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
              placeholder="Contoh: Bu Tejo" 
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
              required 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            placeholder="Tuliskan deskripsi lengkap mengenai UMKM ini..." 
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
              placeholder="Contoh: 081234567890" 
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              required 
            />
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="alamat">Alamat / Lokasi *</label>
            <input 
              type="text" 
              id="alamat" 
              className="admin-input" 
              placeholder="Contoh: RT 02 / RW 01 Dusun Jetis" 
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
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
          <label className="admin-label" htmlFor="foto">Foto Utama</label>
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
            {isLoading ? "Menyimpan..." : "Simpan Data UMKM"}
          </button>
        </div>
      </form>
    </div>
  );
}
