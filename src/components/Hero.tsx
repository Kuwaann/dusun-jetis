export default function Hero() {
  return (
    <section className="hero" id="beranda">
      <div className="hero-bg-placeholder">
        <div className="image-placeholder">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          [Placeholder Gambar Banner Hero]
        </div>
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-blur hero-blur-left"></div>
      <div className="hero-blur hero-blur-right"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Dusun<br />
          Jetis<span className="brand-dot">.</span>
        </h1>
        <p className="hero-location">Desa Jamuskauman, Kec. Ngluwar, Kab. Magelang</p>
      </div>

      <a className="story-card" href="#berita" aria-label="Baca berita BimBel Bersama Mahasiswa KKN">
        <div className="story-image-wrap">
          <div className="image-placeholder">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            [Placeholder Gambar Berita]
          </div>
        </div>
        <div className="story-meta">
          <span>Rabu, 15 Juli 2026</span>
          <span className="story-badge">Berita Terbaru</span>
        </div>
        <h2 className="story-title">
          BimBel Bersama Mahasiswa KKN di Dusun Jetis
          <svg className="story-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h2>
      </a>
    </section>
  );
}
