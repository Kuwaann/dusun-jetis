"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AkunListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState<number | null>(null);

  const dummyAkun = [
    { id: 1, nama: "Budi Santoso", username: "admin_budi", email: "budi@dusunjetis.id", peran: "Admin Utama", status: "Aktif" },
    { id: 2, nama: "Siti Rahmawati", username: "siti_editor", email: "siti@dusunjetis.id", peran: "Editor/Kontributor", status: "Aktif" },
    { id: 3, nama: "Agus Prakoso", username: "agus_staf", email: "agus@dusunjetis.id", peran: "Editor/Kontributor", status: "Nonaktif" },
  ];

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
              <th>Username</th>
              <th>Email</th>
              <th>Peran</th>
              <th>Status</th>
              <th style={{ width: "160px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyAkun.map((akun) => (
              <tr key={akun.id}>
                <td style={{ fontWeight: 500 }}>{akun.nama}</td>
                <td style={{ color: "var(--muted)", fontSize: "13px" }}>@{akun.username}</td>
                <td>{akun.email}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    background: akun.peran === "Admin Utama" ? "rgba(229,193,88,0.15)" : "var(--soft-white)", 
                    color: akun.peran === "Admin Utama" ? "var(--gold)" : "var(--muted)", 
                    borderRadius: "4px", fontSize: "12px", fontWeight: 600 
                  }}>
                    {akun.peran}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    background: akun.status === "Aktif" ? "#e8f5e9" : "#ffebee", 
                    color: akun.status === "Aktif" ? "#2e7d32" : "#c62828", 
                    borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                  }}>
                    {akun.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/dashboard/akun/${akun.id}/edit`} className="admin-btn-edit">Edit</Link>
                  <button 
                    className="admin-btn-danger"
                    onClick={() => {
                      setSelectedAkun(akun.id);
                      setIsDeleteModalOpen(true);
                    }}
                    disabled={akun.peran === "Admin Utama"}
                    style={{ opacity: akun.peran === "Admin Utama" ? 0.3 : 1, cursor: akun.peran === "Admin Utama" ? "not-allowed" : "pointer" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
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
              >
                Batal
              </button>
              <button 
                className="admin-btn-danger"
                style={{ padding: "10px 20px", fontSize: "13px" }}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  alert(`Simulasi: Akun dengan ID ${selectedAkun} berhasil dihapus.`);
                }}
              >
                Ya, Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
