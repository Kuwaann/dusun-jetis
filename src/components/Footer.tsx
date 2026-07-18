import Link from "next/link";
import { MapPin, Phone, Mail, AtSign } from "lucide-react";

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
                <MapPin size={15} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kab. Magelang, Jawa Tengah</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <span>0812-XXXX-XXXX</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <span>dusunjetis@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <AtSign size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
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
