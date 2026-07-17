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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>0812-0000-0000</span>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>dusunjetis@gmail.com</span>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.6"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
