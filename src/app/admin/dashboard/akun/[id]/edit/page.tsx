"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function EditAkunPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi pre-fill data berdasarkan ID
  const [formData, setFormData] = useState({
    nama: "Siti Rahmawati",
    username: "siti_editor",
    email: "siti@dusunjetis.id",
    peran: "Editor",
    status: "Aktif"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Simulasi berhasil memperbarui data Akun ID: ${params.id} (UI Preview).`);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Data Akun</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui informasi profil dan hak akses pengguna #{params.id}.
          </p>
        </div>
        <Link href="/admin/dashboard/akun" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px", maxWidth: "800px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Pribadi & Akses
        </h2>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="nama">Nama Lengkap *</label>
            <input type="text" id="nama" className="admin-input" value={formData.nama} onChange={handleChange} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="peran">Peran Akses *</label>
            <select id="peran" className="admin-input" value={formData.peran} onChange={handleChange} required>
              <option value="Admin Utama">Admin Utama (Akses Penuh)</option>
              <option value="Editor">Editor / Kontributor (Hanya Kelola Konten)</option>
            </select>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="email">Alamat Email *</label>
            <input type="email" id="email" className="admin-input" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="username">Username *</label>
            <input type="text" id="username" className="admin-input" value={formData.username} onChange={handleChange} required />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="status">Status Akun *</label>
          <select id="status" className="admin-input" value={formData.status} onChange={handleChange} required style={{ maxWidth: "388px" }}>
            <option value="Aktif">Aktif (Dapat Login)</option>
            <option value="Nonaktif">Nonaktif (Dilarang Login)</option>
          </select>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "40px 0 24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Pengaturan Keamanan
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", marginTop: "-12px" }}>
          Kosongkan bidang di bawah ini jika Anda tidak ingin mengubah kata sandi pengguna ini.
        </p>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="password">Kata Sandi Baru</label>
            <input type="password" id="password" className="admin-input" placeholder="Opsional (Minimal 8 karakter)" />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</label>
            <input type="password" id="confirmPassword" className="admin-input" placeholder="Opsional" />
          </div>
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/akun" className="admin-btn-secondary">
            Batal
          </Link>
          <button 
            type="submit" 
            className="admin-btn-primary" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Menyimpan..." : "Perbarui Akun"}
          </button>
        </div>
      </form>
    </div>
  );
}
