"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { UploadCloud } from "lucide-react";

export default function EditGaleriPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulasi data foto yang sudah ada
  const [preview, setPreview] = useState<string | null>("https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800&h=500");
  
  const [formData, setFormData] = useState({
    keterangan: "Gotong Royong Kebersihan Wilayah",
    alt: "Kegiatan Gotong Royong Warga"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Simulasi berhasil memperbarui foto galeri ID: ${params.id} (UI Preview).`);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Edit Foto Galeri</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Perbarui keterangan atau ganti foto dokumentasi #{params.id}.
          </p>
        </div>
        <Link href="/admin/dashboard/galeri" className="admin-btn-secondary">
          Kembali ke Daftar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-panel-card" style={{ padding: "32px" }}>
        <div className="admin-form-group">
          <label className="admin-label">Foto Saat Ini *</label>
          <div style={{ 
            border: "2px dashed var(--line)", 
            borderRadius: "var(--radius)", 
            padding: preview ? "20px" : "40px 20px", 
            textAlign: "center",
            background: "var(--soft-white)",
            position: "relative",
            transition: "all 0.2s"
          }}>
            {preview ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", boxShadow: "var(--shadow-soft)", objectFit: "cover" }}
                />
                <button 
                  type="button" 
                  className="admin-btn-secondary" 
                  onClick={() => {
                    setPreview(null);
                    const fileInput = document.getElementById('foto') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                >
                  Hapus / Ganti Foto
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--muted)" }}>
                <UploadCloud size={48} strokeWidth={1.5} />
                <div style={{ fontWeight: 500, color: "var(--black)" }}>Pilih file gambar atau tarik & letakkan di sini</div>
                <div style={{ fontSize: "13px" }}>Format yang didukung: JPG, PNG, WEBP. Maks: 2MB.</div>
              </div>
            )}
            
            <input 
              type="file" 
              id="foto" 
              accept="image/*" 
              onChange={handleFileChange}
              required={!preview}
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0,
                cursor: "pointer",
                display: preview ? "none" : "block"
              }} 
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="keterangan">Keterangan (Caption) *</label>
          <input 
            type="text" 
            id="keterangan" 
            className="admin-input" 
            value={formData.keterangan}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="alt">Teks Alternatif (Alt Text) *</label>
          <input 
            type="text" 
            id="alt" 
            className="admin-input" 
            value={formData.alt}
            onChange={handleChange}
            required 
          />
          <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "8px" }}>
            Contoh: "Warga Dusun Jetis sedang melakukan kerja bakti membersihkan selokan."
          </p>
        </div>

        <div className="admin-form-actions">
          <Link href="/admin/dashboard/galeri" className="admin-btn-secondary">
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
