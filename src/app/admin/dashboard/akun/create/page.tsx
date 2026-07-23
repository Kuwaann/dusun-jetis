"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function CreateAkunPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    role: "editor",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Kata sandi dan konfirmasi tidak cocok!");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal mendaftarkan akun");
      }

      await logActivity("akun", "CREATE", `Mendaftarkan akun baru: ${formData.full_name} (${formData.role})`);

      toast.success("Akun berhasil didaftarkan!");
      router.push("/admin/dashboard/akun");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
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
            <input 
              type="text" 
              id="nama" 
              className="admin-input" 
              placeholder="Contoh: Budi Santoso" 
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="peran">Peran Akses *</label>
            <select 
              id="peran" 
              className="admin-input" 
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="admin">Admin Utama (Akses Penuh)</option>
              <option value="editor">Editor / Kontributor (Hanya Kelola Konten)</option>
            </select>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="email">Alamat Email *</label>
            <input 
              type="email" 
              id="email" 
              className="admin-input" 
              placeholder="contoh@email.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
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
            <input 
              type="password" 
              id="password" 
              className="admin-input" 
              placeholder="Minimal 6 karakter" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="confirmPassword">Konfirmasi Kata Sandi *</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="admin-input" 
              placeholder="Ketik ulang kata sandi" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required 
            />
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
