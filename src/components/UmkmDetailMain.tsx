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
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
