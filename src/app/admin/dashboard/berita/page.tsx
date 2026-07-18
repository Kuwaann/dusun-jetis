"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function BeritaListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<number | null>(null);

  const dummyBerita = [
    { id: 1, judul: "Kerja Bakti Minggu Pagi Bersama Warga", tanggal: "15 Juli 2026", penulis: "Admin Utama", status: "Dipublikasikan" },
    { id: 2, judul: "Penyuluhan Kesehatan di Balai Dusun", tanggal: "10 Juli 2026", penulis: "Admin Desa", status: "Dipublikasikan" },
    { id: 3, judul: "Jadwal Ronda Malam Bulan Agustus", tanggal: "05 Juli 2026", penulis: "Admin Desa", status: "Draf" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Kelola Berita</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Daftar artikel dan pengumuman untuk website Dusun Jetis.
          </p>
        </div>
        <Link href="/admin/dashboard/berita/create" className="admin-btn-primary">
          <Plus size={16} strokeWidth={2} />
          Tambah Berita
        </Link>
      </div>

      <div className="admin-panel-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul Berita</th>
              <th>Tanggal Publikasi</th>
              <th>Penulis</th>
              <th>Status</th>
              <th style={{ width: "160px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyBerita.map((berita) => (
              <tr key={berita.id}>
                <td style={{ fontWeight: 500, maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {berita.judul}
                </td>
                <td>{berita.tanggal}</td>
                <td>{berita.penulis}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    background: berita.status === "Dipublikasikan" ? "#e8f5e9" : "#fff3e0", 
                    color: berita.status === "Dipublikasikan" ? "#2e7d32" : "#e65100", 
                    borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                  }}>
                    {berita.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/dashboard/berita/${berita.id}/edit`} className="admin-btn-edit">Edit</Link>
                  <button 
                    className="admin-btn-danger"
                    onClick={() => {
                      setSelectedBerita(berita.id);
                      setIsDeleteModalOpen(true);
                    }}
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
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Konfirmasi Hapus</h3>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
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
                  alert(`Simulasi: Berita dengan ID ${selectedBerita} berhasil dihapus.`);
                }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
