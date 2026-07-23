"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

interface Berita {
  id: number;
  title: string;
  status: string;
  published_at: string;
  image_url?: string;
  profiles: {
    full_name: string;
  };
}

export default function BeritaListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("berita")
      .select(`
        id, 
        title, 
        status, 
        published_at, 
        image_url,
        profiles (full_name)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBeritaList(data as any);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedBerita) return;
    
    setIsDeleting(true);
    try {
      // Hapus foto dari storage jika ada
      if (selectedBerita.image_url) {
        await deleteImage(selectedBerita.image_url);
      }

      // Hapus data dari tabel
      const { error } = await supabase
        .from("berita")
        .delete()
        .eq("id", selectedBerita.id);

      if (error) throw error;

      // Catat log
      await logActivity("berita", "DELETE", `Menghapus berita: ${selectedBerita.title}`);
      
      // Refresh list
      fetchBerita();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Gagal menghapus Berita:", err);
      toast.error("Gagal menghapus Berita.");
    } finally {
      setIsDeleting(false);
      setSelectedBerita(null);
    }
  };

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
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px" }}>Memuat data Berita...</td>
              </tr>
            ) : beritaList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>Belum ada data Berita.</td>
              </tr>
            ) : (
              beritaList.map((berita) => (
                <tr key={berita.id}>
                  <td style={{ fontWeight: 500, maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {berita.title}
                  </td>
                  <td>{berita.published_at ? new Date(berita.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</td>
                  <td>{berita.profiles?.full_name || 'Admin'}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 8px", 
                      background: berita.status === "published" ? "#e8f5e9" : "#fff3e0", 
                      color: berita.status === "published" ? "#2e7d32" : "#e65100", 
                      borderRadius: "4px", fontSize: "12px", fontWeight: 500 
                    }}>
                      {berita.status === "published" ? "Dipublikasikan" : "Draf"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/dashboard/berita/${berita.id}/edit`} className="admin-btn-edit">Edit</Link>
                    <button 
                      className="admin-btn-danger"
                      onClick={() => {
                        setSelectedBerita(berita);
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
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
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
