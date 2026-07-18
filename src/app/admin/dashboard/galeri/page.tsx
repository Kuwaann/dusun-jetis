"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function GaleriListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGaleri, setSelectedGaleri] = useState<number | null>(null);

  const dummyGaleri = [
    { id: 1, foto: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=200&h=200", keterangan: "Gotong Royong Kebersihan Wilayah", alt: "Kegiatan Gotong Royong Warga", status: "Dipublikasikan" },
    { id: 2, foto: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=200&h=200", keterangan: "Kebersamaan Warga Dusun Jetis", alt: "Kegiatan Dusun Jetis", status: "Dipublikasikan" },
    { id: 3, foto: "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=200&h=200", keterangan: "Kegiatan Posyandu Balita", alt: "Posyandu Dusun Jetis", status: "Draf" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Kelola Galeri</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Daftar dokumentasi foto kegiatan di Dusun Jetis.
          </p>
        </div>
        <Link href="/admin/dashboard/galeri/create" className="admin-btn-primary">
          <Plus size={16} strokeWidth={2} />
          Tambah Foto Baru
        </Link>
      </div>

      <div className="admin-panel-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Foto</th>
              <th>Keterangan (Caption)</th>
              <th>Teks Alternatif (Alt)</th>
              <th>Status</th>
              <th style={{ width: "160px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyGaleri.map((item) => (
              <tr key={item.id}>
                <td>
                  <img 
                    src={item.foto} 
                    alt={item.alt} 
                    style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </td>
                <td style={{ fontWeight: 500 }}>{item.keterangan}</td>
                <td style={{ color: "var(--muted)" }}>{item.alt}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    background: item.status === "Dipublikasikan" ? "#e8f5e9" : "#fff3e0", 
                    color: item.status === "Dipublikasikan" ? "#2e7d32" : "#e65100", 
                    borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/dashboard/galeri/${item.id}/edit`} className="admin-btn-edit">Edit</Link>
                  <button 
                    className="admin-btn-danger"
                    onClick={() => {
                      setSelectedGaleri(item.id);
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
              Apakah Anda yakin ingin menghapus foto galeri ini? Tindakan ini tidak dapat dibatalkan.
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
                  alert(`Simulasi: Foto Galeri dengan ID ${selectedGaleri} berhasil dihapus.`);
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
