import { Phone, Mail, AtSign, ArrowUpRight } from "lucide-react";

export default function KontakMap() {
  return (
    <section className="section contact reveal" id="kontak">
      <h2 className="section-title">Kontak Dusun Jetis</h2>
      <p className="section-subtitle">
        Punya pertanyaan, aspirasi, atau ingin berkunjung? Hubungi layanan administrasi dan pamong Dusun Jetis secara langsung.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <div>
            <div className="contact-group-title">Hubungi Kami</div>
            <div className="contact-list">
              <div className="contact-item">
                <Phone size={18} strokeWidth={1.6} />
                <span>0812-0000-0000</span>
              </div>
              <div className="contact-item">
                <Mail size={18} strokeWidth={1.6} />
                <span>dusunjetis@gmail.com</span>
              </div>
              <div className="contact-item">
                <AtSign size={18} strokeWidth={1.6} />
                <span>@dusunjetis</span>
              </div>
            </div>
          </div>

          <div className="contact-hours">
            <div className="contact-hours-title">Waktu Pelayanan Kantor</div>
            <div className="contact-hours-time">Senin - Jumat | 08:00 - 15:00</div>
          </div>
        </div>

        <div className="map-card">
          <div className="map-header">
            <div className="map-address">
              <strong>Alamat Kantor Dusun</strong>
              Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang, Jawa Tengah
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Lihat di Google Maps
              <ArrowUpRight size={12} strokeWidth={2} />
            </a>
          </div>

          <div className="map-canvas">
            <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="500" fill="#1A1A1A"/>
              <path d="M-50 120 C 150 100, 350 180, 550 140 C 650 120, 750 150, 850 160" stroke="#2A2A2A" strokeWidth="40"/>
              <path d="M100 -50 C 120 150, 80 300, 160 550" stroke="#252525" strokeWidth="30"/>
              <path d="M450 -50 C 420 180, 480 320, 440 550" stroke="#252525" strokeWidth="36"/>
              <path d="M-50 350 C 200 320, 400 380, 850 340" stroke="#2A2A2A" strokeWidth="48"/>
              <path d="M-50 240 Q 400 220 850 260" stroke="#333333" strokeWidth="12" strokeDasharray="8 6"/>

              {/* Location Marker */}
              <circle cx="440" cy="230" r="28" fill="rgba(229,193,88,0.2)"/>
              <circle cx="440" cy="230" r="14" fill="#E5C158"/>
              <circle cx="440" cy="230" r="6" fill="#000000"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
