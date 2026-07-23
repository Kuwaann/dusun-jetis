"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function EditAkunPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "", // Assume we can't easily fetch email without API, but wait we need email to display. 
    // Usually admin UI uses API to get user details. Let's just fetch profile for now, and leave email blank if we can't get it easily. 
    // Actually, we can fetch email from an API route or just leave it blank for the user to fill in if they want to update it.
    // Better: let's not update email for now to simplify, or require them to re-enter. Let's provide a field.
    role: "editor",
    password: "",
    confirmPassword: "",
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        console.error(error);
        toast.error("Gagal memuat profil pengguna.");
        router.push("/admin/dashboard/akun");
      } else {
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || "",
          role: data.role || "editor",
        }));
      }
      setIsFetching(false);
    };

    if (params.id) {
      fetchProfile();
    }
  }, [params.id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Kata sandi dan konfirmasi tidak cocok!");
      return;
    }

    if (!formData.email) {
      toast.error("Email harus diisi untuk mengupdate data auth.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: params.id,
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal memperbarui akun");
      }

      await logActivity("akun", "UPDATE", `Memperbarui akun: ${formData.full_name}`);

      toast.success("Akun berhasil diperbarui!");
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
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Data Akun</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui informasi profil dan hak akses pengguna #{params.id}.
          </p>
        </div>
        <Link href="/admin/dashboard/akun" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      {isFetching ? (
        <div className="admin-panel-card" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
          Memuat data Akun...
        </div>
      ) : (
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
            <label className="admin-label" htmlFor="email">Alamat Email Baru / Lama (Wajib) *</label>
            <input 
              type="email" 
              id="email" 
              className="admin-input" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
              placeholder="Masukkan email untuk memperbarui akun"
            />
          </div>
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
            <input 
              type="password" 
              id="password" 
              className="admin-input" 
              placeholder="Opsional (Minimal 6 karakter)" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="admin-input" 
              placeholder="Opsional" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
            {isLoading ? "Menyimpan..." : "Perbarui Akun"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
