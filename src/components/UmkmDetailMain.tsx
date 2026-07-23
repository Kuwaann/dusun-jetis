import { Image as ImageIcon, ExternalLink } from "lucide-react";

interface UmkmDetailMainProps {
  owner: string;
  whatsapp: string;
  image_url?: string;
  address?: string;
  mapsUrl?: string;
  linktreeUrl?: string;
}

export default function UmkmDetailMain({
  owner,
  whatsapp,
  image_url,
  address = "Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang, Jawa Tengah.",
  mapsUrl,
  linktreeUrl,
}: UmkmDetailMainProps) {
  const waClean = whatsapp ? whatsapp.replace(/[^0-9]/g, "") : "";

  return (
    <section className="section umkm-detail-main reveal">
      {/* Hero Image Box Left */}
      <div className="umkm-detail-hero-box">
        {image_url ? (
          <img 
            src={image_url} 
            alt="Foto Utama UMKM"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
          />
        ) : (
          <div className="image-placeholder">
            <ImageIcon size={24} />
            [Tanpa Gambar]
          </div>
        )}
      </div>

      {/* Sidebar Contact Card Right */}
      <div className="umkm-contact-card">
        <h2 className="umkm-contact-title">Kontak UMKM</h2>
        <div className="umkm-contact-divider"></div>

        <div className="umkm-contact-group">
          <span className="umkm-contact-label">Nama Pemilik</span>
          <p className="umkm-contact-val">{owner}</p>
        </div>

        <div className="umkm-contact-group">
          <span className="umkm-contact-label">Alamat</span>
          <p className="umkm-contact-val">{address}</p>
        </div>

        <div className="umkm-contact-group">
          <span className="umkm-contact-label">Nomor Whatsapp</span>
          <p className="umkm-contact-val umkm-contact-wa">{whatsapp}</p>
        </div>

        <div className="umkm-contact-actions">
          {waClean && (
            <a
              href={`https://wa.me/${waClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="umkm-btn-wa"
            >
              Hubungi Whatsapp
            </a>
          )}

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="umkm-btn-maps"
            >
              Buka Lokasi Maps
            </a>
          )}

          {linktreeUrl && (
            <a
              href={linktreeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="umkm-link-linktree"
            >
              <span>Linktree</span>
              <ExternalLink size={12} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
