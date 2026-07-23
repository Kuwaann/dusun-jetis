"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

interface Akun {
  id: string;
  full_name: string;
  role: string;
  users: {
    email: string;
  };
}

export default function AkunListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState<Akun | null>(null);
  const [akunList, setAkunList] = useState<Akun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchAkun();
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserEmail(data.user?.email || "");
    });
  }, []);

  const fetchAkun = async () => {
    setIsLoading(true);
    // Kita mengambil dari tabel profiles dan melakukan relasi ke tabel auth.users
    // Supabase JS tidak bisa langsung query auth.users, tapi kita bisa join dari profiles jika ada FK
    // Namun `profiles` -> `auth.users` join tidak didukung secara default di data API tanpa setup RPC.
    // Sebagai alternatif, kita ambil profiles, lalu untuk email, kita bisa menggunakan Edge Function,
    // atau di proyek ini kita anggap email tidak ditampilkan secara real-time dari relasi, atau
    // lebih baik kita ubah skema profiles agar menyimpan email juga untuk kemudahan baca.
    // Wait, let's fetch profiles first.
    
    // Karena kita tidak bisa join ke auth.users langsung, saya akan fetch profiles saja, 
    // jika butuh email, kita asumsikan kolom email belum ada di tabel profiles.
    // Saya akan ambil profiles saja dulu.
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAkunList(data as any);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedAkun) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch("/api/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedAkun.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menghapus akun");
      }

      await logActivity("akun", "DELETE", `Menghapus akun: ${selectedAkun.full_name}`);
      
      fetchAkun();
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      console.error("Gagal menghapus akun:", err);
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
      setSelectedAkun(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Manajemen Akun</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Daftar admin dan staf yang memiliki akses ke panel ini.
          </p>
        </div>
        <Link href="/admin/dashboard/akun/create" className="admin-btn-primary">
          <Plus size={16} strokeWidth={2} />
          Daftarkan Akun Baru
        </Link>
      </div>

      <div className="admin-panel-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Peran</th>
              <th>Status</th>
              <th>Status</th>
              <th style={{ width: "160px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "32px" }}>Memuat data Akun...</td>
              </tr>
            ) : akunList.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>Belum ada data Akun.</td>
              </tr>
            ) : (
              akunList.map((akun) => (
                <tr key={akun.id}>
                  <td style={{ fontWeight: 500 }}>{akun.full_name}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 8px", 
                      background: akun.role === "admin" ? "rgba(229,193,88,0.15)" : "var(--soft-white)", 
                      color: akun.role === "admin" ? "var(--gold)" : "var(--muted)", 
                      borderRadius: "4px", fontSize: "12px", fontWeight: 600 
                    }}>
                      {akun.role === "admin" ? "Admin Utama" : "Editor/Kontributor"}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      padding: "4px 8px", 
                      background: "#e8f5e9", 
                      color: "#2e7d32", 
                      borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                    }}>
                      Aktif
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/dashboard/akun/${akun.id}/edit`} className="admin-btn-edit">Edit</Link>
                    <button 
                      className="admin-btn-danger"
                      onClick={() => {
                        setSelectedAkun(akun);
                        setIsDeleteModalOpen(true);
                      }}
                      disabled={akun.role === "admin"}
                      style={{ opacity: akun.role === "admin" ? 0.3 : 1, cursor: akun.role === "admin" ? "not-allowed" : "pointer" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "var(--white)", padding: "32px", borderRadius: "var(--radius)",
            width: "100%", maxWidth: "400px", boxShadow: "0 24px 48px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Konfirmasi Hapus Akun</h3>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus akun ini? Pengguna tersebut tidak akan bisa lagi mengakses panel admin.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                className="admin-btn-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
              >
                Batal
              </button>
              <button 
                className="admin-btn-danger"
                style={{ padding: "10px 20px", fontSize: "13px", opacity: isDeleting ? 0.7 : 1 }}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus Akun"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
