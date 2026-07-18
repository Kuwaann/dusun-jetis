import { Image as ImageIcon, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="beranda">
      <div className="hero-bg-placeholder">
        <img 
          src="/DSC00170.JPG" 
          alt="Banner Dusun Jetis" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
            <ImageIcon size={24} />
            [Placeholder Gambar Berita]
          </div>
        </div>
        <div className="story-meta">
          <span>Rabu, 15 Juli 2026</span>
          <span className="story-badge">Berita Terbaru</span>
        </div>
        <h2 className="story-title">
          BimBel Bersama Mahasiswa KKN di Dusun Jetis
          <ArrowUpRight className="story-icon" size={16} strokeWidth={2} />
        </h2>
      </a>
    </section>
  );
}
