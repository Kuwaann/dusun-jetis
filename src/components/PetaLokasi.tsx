import { ArrowUpRight } from "lucide-react";

export default function PetaLokasi() {
  return (
    <section className="section reveal" id="peta-lokasi">
      <div className="map-card" style={{ width: '100%', minHeight: '560px', display: 'flex', flexDirection: 'column' }}>
        <div className="map-header" style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', padding: '36px 36px 28px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '650px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '14px', letterSpacing: '-0.04em', color: '#ffffff' }}>Peta Lokasi Dusun Jetis</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, letterSpacing: '-0.02em', margin: 0 }}>
              Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan Dusun Jetis. Mulai dari profil dusun, data administrasi, potensi dusun, dan juga berita terbaru dari Dusun Jetis.
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/G337hPx9dwJYwiY76"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: '6px', padding: '12px 20px', fontSize: '13px' }}
          >
            Lihat di Google Maps
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        <div className="map-canvas-container" style={{ width: '100%', padding: '0 4px 4px' }}>
          <div style={{ width: '100%', height: '420px', borderRadius: 'calc(var(--radius) - 4px)', overflow: 'hidden', background: '#1a1a1a' }}>
             <iframe 
                src="https://maps.google.com/maps?q=Jetis,+Jamuskauman,+Ngluwar,+Magelang&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
