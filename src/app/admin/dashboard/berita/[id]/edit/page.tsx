"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { List, Link as LinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, deleteImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function EditBeritaPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    published_at: "",
    status: "",
    image_url: "",
  });
  
  const [initialContent, setInitialContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (params.id) {
      fetchBerita();
    }
  }, [params.id]);

  const fetchBerita = async () => {
    setIsFetching(true);
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      console.error(error);
      toast.error("Gagal memuat data berita.");
      router.push("/admin/dashboard/berita");
    } else {
      setFormData({
        title: data.title,
        published_at: data.published_at ? data.published_at.split('T')[0] : "",
        status: data.status,
        image_url: data.image_url || "",
      });
      setInitialContent(data.content || "");
    }
    setIsFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent, status: "published" | "draft" | null = null) => {
    e.preventDefault();
    setIsLoading(true);

    const finalStatus = status || formData.status;

    try {
      let finalImageUrl = formData.image_url;

      // 1. Upload foto baru jika ada
      if (imageFile) {
        if (formData.image_url) {
          await deleteImage(formData.image_url);
        }
        finalImageUrl = await uploadImage(imageFile, "berita");
      }

      // 2. Extract content from RTE
      const content = contentRef.current?.innerHTML || "";

      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // 3. Update database
      const { error } = await supabase
        .from("berita")
        .update({
          title: formData.title,
          slug: slug,
          content: content,
          status: finalStatus,
          published_at: finalStatus === "published" ? (formData.published_at || new Date().toISOString().split('T')[0]) : null,
          image_url: finalImageUrl,
        })
        .eq("id", params.id);

      if (error) throw error;

      // 4. Log Aktivitas
      await logActivity("berita", "UPDATE", `Memperbarui berita: ${formData.title}`);

      toast.success("Berita berhasil diperbarui!");
      router.push("/admin/dashboard/berita");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal memperbarui berita: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormat = (command: string) => {
    document.execCommand(command, false, undefined);
    contentRef.current?.focus();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Berita</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui artikel berita #{params.id} di bawah ini.
          </p>
        </div>
        <Link href="/admin/dashboard/berita" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      {isFetching ? (
        <div className="admin-panel-card" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
          Memuat data Berita...
        </div>
      ) : (
      <form onSubmit={(e) => handleSubmit(e)} className="admin-panel-card" style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Artikel
        </h2>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="judul">Judul Berita *</label>
          <input 
            type="text" 
            id="judul" 
            className="admin-input" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
          />
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="tanggal">Tanggal Publikasi</label>
            <input 
              type="date" 
              id="tanggal" 
              className="admin-input" 
              value={formData.published_at} 
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })} 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="foto">Ganti Foto Utama (Biarkan kosong jika tidak diubah)</label>
            <input 
              type="file" 
              id="foto" 
              className="admin-input" 
              accept="image/*" 
              style={{ padding: "10px 16px" }} 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
            {formData.image_url && (
              <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>
                Foto saat ini sudah tersimpan. Unggah foto baru untuk menggantinya.
              </div>
            )}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="konten">Isi Berita *</label>
          
          <div className="admin-rte-container">
            <div className="admin-rte-toolbar">
              <button type="button" className="admin-rte-btn" onClick={() => toggleFormat('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" className="admin-rte-btn" onClick={() => toggleFormat('italic')} title="Italic">
                <em>I</em>
              </button>
              <button type="button" className="admin-rte-btn" onClick={() => toggleFormat('underline')} title="Underline">
                <u>U</u>
              </button>
              <div style={{ width: "1px", background: "var(--line)", margin: "4px 8px" }}></div>
              <button type="button" className="admin-rte-btn" onClick={() => toggleFormat('insertUnorderedList')} title="Bullet List">
                <List size={18} strokeWidth={2} />
              </button>
            </div>
            
            {/* The editable area */}
            <div 
              ref={contentRef}
              className="admin-rte-editor" 
              contentEditable={true} 
              suppressContentEditableWarning={true}
              dangerouslySetInnerHTML={{ __html: initialContent }}
            >
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/berita" className="admin-btn-secondary">
            Batal
          </Link>
          <button 
            type="button" 
            className="admin-btn-secondary"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isLoading}
          >
            Ubah jadi Draf
          </button>
          <button 
            type="submit" 
            className="admin-btn-primary" 
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Menyimpan..." : "Perbarui Publikasi"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
