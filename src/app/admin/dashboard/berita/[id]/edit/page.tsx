"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { List, Link as LinkIcon } from "lucide-react";

export default function EditBeritaPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFormat, setActiveFormat] = useState({
    bold: false, italic: false, underline: false, list: false
  });

  const [formData, setFormData] = useState({
    judul: "Kerja Bakti Minggu Pagi Bersama Warga",
    tanggal: "2026-07-15",
    metaTitle: "Kerja Bakti Minggu Pagi Dusun Jetis",
    metaDesc: "Liputan kegiatan kerja bakti minggu pagi yang dilakukan oleh warga Dusun Jetis dalam rangka persiapan lomba kebersihan."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Simulasi berhasil memperbarui berita ID: ${params.id} (UI Preview).`);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const toggleFormat = (format: keyof typeof activeFormat) => {
    setActiveFormat(prev => ({ ...prev, [format]: !prev[format] }));
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

      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Informasi Artikel
        </h2>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="judul">Judul Berita *</label>
          <input type="text" id="judul" className="admin-input" value={formData.judul} onChange={handleChange} required />
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="tanggal">Tanggal Publikasi</label>
            <input type="date" id="tanggal" className="admin-input" value={formData.tanggal} onChange={handleChange} />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="foto">Ganti Foto Utama (Biarkan kosong jika tidak diubah)</label>
            <input type="file" id="foto" className="admin-input" accept="image/*" style={{ padding: "10px 16px" }} />
            <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>Foto saat ini: kerja-bakti.jpg</div>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="konten">Isi Berita *</label>
          
          {/* Rich Text Editor Mockup */}
          <div className="admin-rte-container">
            <div className="admin-rte-toolbar">
              <button type="button" className={`admin-rte-btn ${activeFormat.bold ? 'active' : ''}`} onClick={() => toggleFormat('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" className={`admin-rte-btn ${activeFormat.italic ? 'active' : ''}`} onClick={() => toggleFormat('italic')} title="Italic">
                <em>I</em>
              </button>
              <button type="button" className={`admin-rte-btn ${activeFormat.underline ? 'active' : ''}`} onClick={() => toggleFormat('underline')} title="Underline">
                <u>U</u>
              </button>
              <div style={{ width: "1px", background: "var(--line)", margin: "4px 8px" }}></div>
              <button type="button" className={`admin-rte-btn ${activeFormat.list ? 'active' : ''}`} onClick={() => toggleFormat('list')} title="Bullet List">
                <List size={18} strokeWidth={2} />
              </button>
              <button type="button" className="admin-rte-btn" title="Add Link">
                <LinkIcon size={16} strokeWidth={2} />
              </button>
            </div>
            
            {/* The editable area */}
            <div 
              className="admin-rte-editor" 
              contentEditable={true} 
              suppressContentEditableWarning={true}
              style={{
                fontWeight: activeFormat.bold ? 'bold' : 'normal',
                fontStyle: activeFormat.italic ? 'italic' : 'normal',
                textDecoration: activeFormat.underline ? 'underline' : 'none',
              }}
            >
              Warga Dusun Jetis mengadakan kerja bakti bersama pada Minggu pagi. Kegiatan ini diikuti oleh puluhan warga...
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "40px 0 24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
          Pengaturan SEO (Opsional)
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", marginTop: "-12px" }}>
          Atur informasi metadata agar artikel ini mudah ditemukan di Google.
        </p>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaTitle">Meta Title</label>
          <input type="text" id="metaTitle" className="admin-input" value={formData.metaTitle} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="metaDesc">Meta Description</label>
          <textarea id="metaDesc" className="admin-input" style={{ minHeight: "80px", resize: "vertical" }} value={formData.metaDesc} onChange={handleChange}></textarea>
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/berita" className="admin-btn-secondary">
            Batal
          </Link>
          <button 
            type="button" 
            className="admin-btn-secondary" 
          >
            Ubah jadi Draf
          </button>
          <button 
            type="submit" 
            className="admin-btn-primary" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Menyimpan..." : "Perbarui Publikasi"}
          </button>
        </div>
      </form>
    </div>
  );
}
