"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

interface Umkm {
  id: number;
  name: string;
  category: string;
  whatsapp_number: string;
  image_url?: string;
}

export default function UmkmListPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<Umkm | null>(null);
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchUmkm();
  }, []);

  const fetchUmkm = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("umkm")
      .select("id, name, category, whatsapp_number, image_url")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUmkmList(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedUmkm) return;
    
    setIsDeleting(true);
    try {
      // Hapus foto dari storage jika ada
      if (selectedUmkm.image_url) {
        await deleteImage(selectedUmkm.image_url);
      }

      // Hapus data dari tabel
      const { error } = await supabase
        .from("umkm")
        .delete()
        .eq("id", selectedUmkm.id);

      if (error) throw error;

      // Catat log
      await logActivity("umkm", "DELETE", `Menghapus UMKM: ${selectedUmkm.name}`);
      
      // Refresh list
      fetchUmkm();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Gagal menghapus UMKM:", err);
      toast.error("Gagal menghapus UMKM.");
    } finally {
      setIsDeleting(false);
      setSelectedUmkm(null);
    }
  };

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
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px" }}>Memuat data UMKM...</td>
              </tr>
            ) : umkmList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>Belum ada data UMKM.</td>
              </tr>
            ) : (
              umkmList.map((umkm) => (
                <tr key={umkm.id}>
                  <td style={{ fontWeight: 500 }}>{umkm.name}</td>
                  <td>{umkm.category}</td>
                  <td>{umkm.whatsapp_number}</td>
                  <td>
                    <span style={{ padding: "4px 8px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "4px", fontSize: "12px", fontWeight: 500 }}>
                      Aktif
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/dashboard/umkm/${umkm.id}/edit`} className="admin-btn-edit">Edit</Link>
                    <button 
                      className="admin-btn-danger"
                      onClick={() => {
                        setSelectedUmkm(umkm);
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
              Apakah Anda yakin ingin menghapus data UMKM ini? Tindakan ini tidak dapat dibatalkan.
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
