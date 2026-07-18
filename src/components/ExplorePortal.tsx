import { User, List, ShoppingBag, Image as ImageIcon, Newspaper, Mail, ArrowUpRight } from "lucide-react";

export default function ExplorePortal() {
  const tiles = [
    {
      title: "Profil Dusun",
      href: "#profil",
      icon: <User size={18} strokeWidth={1.6} />
    },
    {
      title: "Data Administrasi Dusun",
      href: "#data",
      icon: <List size={18} strokeWidth={1.6} />
    },
    {
      title: "UMKM Dusun",
      href: "#umkm",
      icon: <ShoppingBag size={18} strokeWidth={1.6} />
    },
    {
      title: "Galeri Dusun",
      href: "#galeri",
      icon: <ImageIcon size={18} strokeWidth={1.6} />
    },
    {
      title: "Berita Dusun",
      href: "#berita",
      icon: <Newspaper size={18} strokeWidth={1.6} />
    },
    {
      title: "Kontak Dusun",
      href: "#kontak",
      icon: <Mail size={18} strokeWidth={1.6} />
    }
  ];

  return (
    <section className="section explore reveal" id="galeri">
      <div className="explore-photo">
        <img 
          src="/DSC00161.JPG" 
          alt="Jelajahi Dusun Jetis" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div className="explore-panel">
        <div>
          <h2 className="explore-title">Jelajahi Dusun Jetis Secara Daring</h2>
          <p className="explore-desc">
            Melalui website ini, Anda dapat menjelajahi segala hal yang berhubungan dengan Dusun Jetis.
            Mulai dari profil dusun, data administrasi, potensi dusun, hingga berita terbaru tentang Dusun Jetis.
          </p>
        </div>

        <div className="menu-grid">
          {tiles.map((tile, idx) => (
            <a key={idx} href={tile.href} className="menu-card">
              <div className="menu-card-top">
                {tile.icon}
                <span>{tile.title}</span>
              </div>
              <div className="menu-card-bottom">
                <span>Pelajari Selengkapnya</span>
                <span className="tile-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
