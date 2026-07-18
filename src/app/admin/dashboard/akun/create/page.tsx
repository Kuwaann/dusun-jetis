"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateAkunPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Simulasi berhasil mendaftarkan akun baru (UI Preview).");
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Daftarkan Akun Baru</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Buat akun untuk staf atau admin baru agar dapat mengakses dasbor ini.
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
            <input type="text" id="nama" className="admin-input" placeholder="Contoh: Budi Santoso" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="peran">Peran Akses *</label>
            <select id="peran" className="admin-input" required defaultValue="Editor">
              <option value="Admin Utama">Admin Utama (Akses Penuh)</option>
              <option value="Editor">Editor / Kontributor (Hanya Kelola Konten)</option>
            </select>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="email">Alamat Email *</label>
            <input type="email" id="email" className="admin-input" placeholder="contoh@email.com" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="username">Username *</label>
            <input type="text" id="username" className="admin-input" placeholder="Minimal 5 karakter tanpa spasi" required />
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "40px 0 24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Pengaturan Keamanan
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", marginTop: "-12px" }}>
          Buat kata sandi awal untuk pengguna ini. Pengguna disarankan untuk mengubah kata sandinya setelah login pertama kali.
        </p>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="password">Kata Sandi Baru *</label>
            <input type="password" id="password" className="admin-input" placeholder="Minimal 8 karakter" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="confirmPassword">Konfirmasi Kata Sandi *</label>
            <input type="password" id="confirmPassword" className="admin-input" placeholder="Ketik ulang kata sandi" required />
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
            {isLoading ? "Memproses..." : "Daftarkan Akun"}
          </button>
        </div>
      </form>
    </div>
  );
}
