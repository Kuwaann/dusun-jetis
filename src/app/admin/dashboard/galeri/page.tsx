"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

interface Galeri {
  id: number;
  image_url: string;
  title: string;
}

export default function GaleriListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGaleri, setSelectedGaleri] = useState<Galeri | null>(null);
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("galeri")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setGaleriList(data as any);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedGaleri) return;
    
    setIsDeleting(true);
    try {
      // Hapus foto dari storage jika ada
      if (selectedGaleri.image_url) {
        await deleteImage(selectedGaleri.image_url);
      }

      // Hapus data dari tabel
      const { error } = await supabase
        .from("galeri")
        .delete()
        .eq("id", selectedGaleri.id);

      if (error) throw error;

      // Catat log
      await logActivity("galeri", "DELETE", `Menghapus foto galeri: ${selectedGaleri.title || selectedGaleri.id}`);
      
      // Refresh list
      fetchGaleri();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
      toast.error("Gagal menghapus foto galeri.");
    } finally {
      setIsDeleting(false);
      setSelectedGaleri(null);
    }
  };

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
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px" }}>Memuat data Galeri...</td>
              </tr>
            ) : galeriList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>Belum ada data Galeri.</td>
              </tr>
            ) : (
              galeriList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img 
                      src={item.image_url || "https://placehold.co/200x200?text=No+Image"} 
                      alt={item.title} 
                      style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--line)" }}
                    />
                  </td>
                  <td style={{ fontWeight: 500 }}>{item.title || '-'}</td>
                  <td style={{ color: "var(--muted)" }}>{item.title || '-'}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 8px", 
                      background: "#e8f5e9", 
                      color: "#2e7d32", 
                      borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                    }}>
                      Dipublikasikan
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/dashboard/galeri/${item.id}/edit`} className="admin-btn-edit">Edit</Link>
                    <button 
                      className="admin-btn-danger"
                      onClick={() => {
                        setSelectedGaleri(item);
                        setIsDeleteModalOpen(true);
                      }}
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
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Konfirmasi Hapus</h3>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus foto galeri ini? Tindakan ini tidak dapat dibatalkan.
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
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
