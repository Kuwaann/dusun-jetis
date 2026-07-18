"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function UmkmListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<number | null>(null);

  const dummyUmkm = [
    { id: 1, nama: "Keripik Singkong Bu Tejo", kategori: "Makanan", kontak: "081234567890", status: "Aktif" },
    { id: 2, nama: "Kerajinan Bambu Pak RT", kategori: "Kerajinan", kontak: "085678901234", status: "Aktif" },
    { id: 3, nama: "Jamu Tradisional Mbah Joyo", kategori: "Minuman", kontak: "089012345678", status: "Aktif" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Kelola UMKM</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Daftar usaha mikro kecil dan menengah di Dusun Jetis.
          </p>
        </div>
        <Link href="/admin/dashboard/umkm/create" className="admin-btn-primary">
          <Plus size={16} strokeWidth={2} />
          Tambah UMKM
        </Link>
      </div>

      <div className="admin-panel-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama UMKM</th>
              <th>Kategori</th>
              <th>Kontak</th>
              <th>Status</th>
              <th style={{ width: "160px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyUmkm.map((umkm) => (
              <tr key={umkm.id}>
                <td style={{ fontWeight: 500 }}>{umkm.nama}</td>
                <td>{umkm.kategori}</td>
                <td>{umkm.kontak}</td>
                <td>
                  <span style={{ padding: "4px 8px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "4px", fontSize: "12px", fontWeight: 500 }}>
                    {umkm.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/dashboard/umkm/${umkm.id}/edit`} className="admin-btn-edit">Edit</Link>
                  <button 
                    className="admin-btn-danger"
                    onClick={() => {
                      setSelectedUmkm(umkm.id);
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
              Apakah Anda yakin ingin menghapus data UMKM ini? Tindakan ini tidak dapat dibatalkan.
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
                  alert(`Simulasi: UMKM dengan ID ${selectedUmkm} berhasil dihapus.`);
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
