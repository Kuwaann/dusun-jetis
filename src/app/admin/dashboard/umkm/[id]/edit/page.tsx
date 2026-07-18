"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function EditUmkmPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi pre-fill data berdasarkan ID
  const [formData, setFormData] = useState({
    nama: "Keripik Singkong Bu Tejo",
    kategori: "Makanan",
    deskripsi: "Keripik singkong renyah khas Dusun Jetis yang diolah dengan bumbu rempah pilihan tanpa bahan pengawet.",
    kontak: "081234567890",
    alamat: "RT 02 / RW 01 Dusun Jetis",
    metaTitle: "Keripik Singkong Bu Tejo - Camilan Khas Dusun Jetis",
    metaDesc: "Beli Keripik Singkong Bu Tejo asli Dusun Jetis, Magelang. Camilan renyah dan gurih dengan bumbu tradisional yang menggugah selera."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Simulasi berhasil memperbarui data UMKM ID: ${params.id} (UI Preview).`);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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

      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Utama
        </h2>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="nama">Nama UMKM *</label>
            <input type="text" id="nama" className="admin-input" value={formData.nama} onChange={handleChange} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kategori">Kategori *</label>
            <select id="kategori" className="admin-input" value={formData.kategori} onChange={handleChange} required>
              <option value="" disabled>Pilih Kategori</option>
              <option value="Makanan">Makanan & Minuman</option>
              <option value="Kerajinan">Kerajinan Tangan</option>
              <option value="Jasa">Jasa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="deskripsi">Deskripsi *</label>
          <textarea id="deskripsi" className="admin-input admin-textarea" value={formData.deskripsi} onChange={handleChange} required></textarea>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kontak">Kontak WhatsApp *</label>
            <input type="text" id="kontak" className="admin-input" value={formData.kontak} onChange={handleChange} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="foto">Ganti Foto Utama (Biarkan kosong jika tidak diubah)</label>
            <input type="file" id="foto" className="admin-input" accept="image/*" style={{ padding: "10px 16px" }} />
            <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>Foto saat ini: keripik-butejo.jpg</div>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="alamat">Alamat / Lokasi</label>
          <input type="text" id="alamat" className="admin-input" value={formData.alamat} onChange={handleChange} />
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "40px 0 24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Pengaturan SEO (Opsional)
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", marginTop: "-12px" }}>
          Atur informasi metadata agar halaman UMKM ini mudah ditemukan di Google.
        </p>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaTitle">Meta Title</label>
          <input type="text" id="metaTitle" className="admin-input" value={formData.metaTitle} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaDesc">Meta Description</label>
          <textarea id="metaDesc" className="admin-input" style={{ minHeight: "80px", resize: "vertical" }} value={formData.metaDesc} onChange={handleChange}></textarea>
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
    </div>
  );
}
