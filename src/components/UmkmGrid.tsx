import { ShoppingBag, ArrowRightCircle } from "lucide-react";

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
                <ShoppingBag size={24} />
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
                <ArrowRightCircle size={18} strokeWidth={1.8} className="umkm-card-link-icon" />
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
