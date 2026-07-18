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
            href="https://maps.google.com/?q=Dusun+Jetis,+Jamuskauman,+Ngluwar,+Magelang"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: '6px', padding: '12px 20px', fontSize: '13px' }}
          >
            Lihat di Google Maps
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        <div className="map-canvas-container" style={{ flex: 1, padding: '0 4px 4px', display: 'flex' }}>
          <div style={{ width: '100%', minHeight: '380px', borderRadius: 'calc(var(--radius) - 4px)', overflow: 'hidden', background: '#e5e5e5', position: 'relative' }}>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.463665492987!2d110.3013866!3d-7.6186847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8bb03b90558b%3A0xc39f2eb5fb146db7!2sJetis%2C%20Jamuskauman%2C%20Ngluwar%2C%20Magelang%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0, filter: 'grayscale(100%) contrast(1.1) brightness(1.1)' }} 
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
