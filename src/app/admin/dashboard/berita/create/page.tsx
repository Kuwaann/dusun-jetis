"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";
import { logActivity } from "@/lib/supabase/logger";
import { toast } from "sonner";

export default function CreateBeritaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    published_at: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent, status: "published" | "draft" = "published") => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let image_url = null;

      // 1. Upload image if exists
      if (imageFile) {
        image_url = await uploadImage(imageFile, "berita");
      }

      // 2. Extract content from RTE
      const content = contentRef.current?.innerHTML || "";

      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Check if profile exists, create one if not to satisfy foreign key
      let authorId = null;
      if (user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (profile) {
          authorId = user.id;
        } else {
          const username = user.email?.split("@")[0] || "admin";
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              username: username,
              full_name: user.user_metadata?.full_name || username,
              role: "admin_utama",
              is_active: true
            });
          
          if (!profileError) {
            authorId = user.id;
          }
        }
      }

      // 3. Insert to database
      const { error } = await supabase
        .from("berita")
        .insert({
          title: formData.title,
          slug: slug,
          content: content,
          status: status,
          published_at: status === "published" ? formData.published_at : null,
          image_url: image_url,
          author_id: authorId,
        });

      if (error) throw error;

      // 4. Log Activity
      await logActivity("berita", "CREATE", `Menulis berita baru: ${formData.title}`);

      toast.success("Berita berhasil disimpan!");
      router.push("/admin/dashboard/berita");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan berita: " + (error instanceof Error ? error.message : "Terjadi kesalahan"));
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
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Tulis Berita Baru</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Buat pengumuman atau artikel baru untuk warga Dusun Jetis.
          </p>
        </div>
        <Link href="/admin/dashboard/berita" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Artikel
        </h2>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="judul">Judul Berita *</label>
          <input 
            type="text" 
            id="judul" 
            className="admin-input" 
            placeholder="Masukkan judul yang menarik..." 
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
            <label className="admin-label" htmlFor="foto">Foto Utama (Hero Image)</label>
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
              data-placeholder="Mulai menulis berita di sini..."
            ></div>
          </div>
          <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "8px" }}>
            *Gunakan toolbar untuk format teks dasar.
          </p>
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
            Simpan Draf
          </button>
          <button 
            type="button" 
            className="admin-btn-primary" 
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Mempublikasikan..." : "Publikasikan Berita"}
          </button>
        </div>
      </form>
    </div>
  );
}
