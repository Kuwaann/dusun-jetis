import { Image as ImageIcon, ExternalLink } from "lucide-react";

interface UmkmDetailMainProps {
  address: string;
  whatsapp: string;
  mapsUrl?: string;
  linktreeUrl?: string;
}

export default function UmkmDetailMain({
  address,
  whatsapp,
  mapsUrl = "https://maps.google.com",
  linktreeUrl = "#",
}: UmkmDetailMainProps) {
  const waClean = whatsapp.replace(/[^0-9]/g, "");

  return (
    <section className="section umkm-detail-main reveal">
      {/* Hero Image Box Left */}
      <div className="umkm-detail-hero-box">
        <div className="image-placeholder">
          <ImageIcon size={24} />
          [Placeholder Foto Utama UMKM]
        </div>
      </div>

      {/* Sidebar Contact Card Right */}
      <div className="umkm-contact-card">
        <h2 className="umkm-contact-title">Kontak UMKM</h2>
        <div className="umkm-contact-divider"></div>

        <div className="umkm-contact-group">
          <span className="umkm-contact-label">Alamat</span>
          <p className="umkm-contact-val">{address}</p>
        </div>

        <div className="umkm-contact-group">
          <span className="umkm-contact-label">Nomor Whatsapp</span>
          <p className="umkm-contact-val umkm-contact-wa">{whatsapp}</p>
        </div>

        <div className="umkm-contact-actions">
          <a
            href={`https://wa.me/${waClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="umkm-btn-wa"
          >
            Hubungi Whatsapp
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="umkm-btn-maps"
          >
            Buka Lokasi Maps
          </a>

          <a
            href={linktreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="umkm-link-linktree"
          >
            <span>Linktree</span>
            <ExternalLink size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
