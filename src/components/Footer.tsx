import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">
              Jetis<span className="brand-dot">.</span>
            </Link>
            <div className="footer-tagline">&quot;Guyub Rukun Handarbeni&quot;</div>
          </div>

          <div>
            <div className="footer-col-title">Menu Utama</div>
            <div className="footer-links">
              <Link href="/#beranda">Beranda</Link>
              <Link href="/profil">Profil Dusun</Link>
              <Link href="/data-administrasi">Data Administrasi</Link>
              <Link href="/umkm">UMKM</Link>
              <Link href="/berita">Berita</Link>
              <Link href="/galeri">Galeri</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Kontak Dusun</div>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                <span>Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kab. Magelang, Jawa Tengah</span>
              </div>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>0812-XXXX-XXXX</span>
              </div>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>dusunjetis@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.8"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                <span>@dusunjetis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ justifyContent: "center" }}>
          <span>&copy; 2026 Dusun Jetis - KKN UPNYK 84.085</span>
        </div>
      </div>
    </footer>
  );
}
