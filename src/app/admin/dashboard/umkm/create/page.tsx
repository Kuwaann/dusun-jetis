"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateUmkmPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Simulasi berhasil menyimpan data UMKM (UI Preview).");
    }, 1000);
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
            <input type="text" id="nama" className="admin-input" placeholder="Contoh: Keripik Bu Tejo" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kategori">Kategori *</label>
            <select id="kategori" className="admin-input" required defaultValue="">
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
          <textarea id="deskripsi" className="admin-input admin-textarea" placeholder="Tuliskan deskripsi lengkap mengenai UMKM ini..." required></textarea>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="kontak">Kontak WhatsApp *</label>
            <input type="text" id="kontak" className="admin-input" placeholder="Contoh: 081234567890" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="foto">Foto Utama</label>
            <input type="file" id="foto" className="admin-input" accept="image/*" style={{ padding: "10px 16px" }} />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="alamat">Alamat / Lokasi</label>
          <input type="text" id="alamat" className="admin-input" placeholder="Contoh: RT 02 / RW 01 Dusun Jetis" />
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "40px 0 24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Pengaturan SEO (Opsional)
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", marginTop: "-12px" }}>
          Atur informasi metadata agar halaman UMKM ini mudah ditemukan di Google.
        </p>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaTitle">Meta Title</label>
          <input type="text" id="metaTitle" className="admin-input" placeholder="Tulis judul unik untuk SEO (Maks 60 karakter)" />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaDesc">Meta Description</label>
          <textarea id="metaDesc" className="admin-input" style={{ minHeight: "80px", resize: "vertical" }} placeholder="Tulis deskripsi singkat untuk SEO (Maks 160 karakter)"></textarea>
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
