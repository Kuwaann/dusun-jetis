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
                <span>+62 882 1670 9774</span>
              </div>
              <div className="contact-item">
                <Mail size={18} strokeWidth={1.6} />
                <span>dusunjetis@gmail.com</span>
              </div>
              <div className="contact-item">
                <AtSign size={18} strokeWidth={1.6} />
                <span>@brayatjetis</span>
              </div>
            </div>
          </div>

          <div className="contact-hours">
            <div className="contact-hours-title">Waktu Pelayanan Kantor</div>
            <div className="contact-hours-time">
              Senin - Kamis: 08:00 - 14:00 <br />
              Jumat: 08:00 - 12:30
            </div>
          </div>
        </div>

        <div className="map-card">
          <div className="map-header">
            <div className="map-address">
              <strong>Alamat Kantor Dusun</strong>
              973M+C29, Jamus Krajan, Jamuskauman, Kec. Ngluwar, Kabupaten Magelang, Jawa Tengah 56485
            </div>
            <a
              href="https://maps.app.goo.gl/G337hPx9dwJYwiY76"
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
            <iframe
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: 'grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)' 
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=973M%2BC29,+Jamus+Krajan,+Jamuskauman,+Kec.+Ngluwar,+Kabupaten+Magelang,+Jawa+Tengah+56485&t=&z=16&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
