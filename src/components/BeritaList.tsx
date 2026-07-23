import Link from "next/link";
import { Newspaper, ArrowRightCircle } from "lucide-react";

export default function BeritaList({ items }: { items: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="section berita-list reveal">
      {items.map((item) => {
        const date = item.published_at 
          ? new Date(item.published_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
          : "Tanggal tidak diketahui";
        
        return (
          <article key={item.id} className="berita-item-card">
            <div className="berita-item-image">
              <Link href={`/berita/${item.slug || item.id}`}>
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  />
                ) : (
                  <div className="image-placeholder">
                    <Newspaper size={24} />
                    [Tanpa Gambar]
                  </div>
                )}
              </Link>
            </div>

            <div className="berita-item-content">
              <h3 className="berita-item-title">
                <Link href={`/berita/${item.slug || item.id}`}>{item.title}</Link>
              </h3>
              <div className="berita-item-date">{date}</div>
              <p className="berita-item-excerpt">
                {item.excerpt || item.content?.substring(0, 200).replace(/<[^>]+>/g, '') + '...'}
              </p>
              <Link href={`/berita/${item.slug || item.id}`} className="berita-item-link">
                <span>Baca Selengkapnya</span>
                <ArrowRightCircle size={14} strokeWidth={1.6} />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
