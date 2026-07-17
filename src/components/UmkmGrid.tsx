interface UmkmItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  href?: string;
}

interface UmkmGridProps {
  items: UmkmItem[];
}

export default function UmkmGrid({ items }: UmkmGridProps) {
  return (
    <div className="section umkm-grid reveal">
      {items.length > 0 ? (
        items.map((item) => (
          <article key={item.id} className="umkm-card">
            <div className="umkm-card-image">
              <div className="image-placeholder">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 10H4L5 9z" />
                </svg>
                [Placeholder Foto UMKM]
              </div>
            </div>

            <div className="umkm-card-content">
              <div>
                <span className="umkm-badge">{item.category}</span>
                <h3 className="umkm-card-title">{item.title}</h3>
                <p className="umkm-card-desc">{item.desc}</p>
              </div>

              <a href={`/umkm/${item.id}`} className="umkm-card-link">
                <span className="umkm-card-link-text">Pelajari Selanjutnya</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="umkm-card-link-icon">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        ))
      ) : (
        <div className="umkm-empty">
          <p>Tidak ada UMKM yang ditemukan cocok dengan kata kunci pencarian.</p>
        </div>
      )}
    </div>
  );
}
