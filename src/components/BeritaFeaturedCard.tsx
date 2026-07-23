import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function BeritaFeaturedCard({ item }: { item: any }) {
  if (!item) return null;

  const date = item.published_at 
    ? new Date(item.published_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : "Tanggal tidak diketahui";

  return (
    <div className="section berita-featured-card reveal">
      <div className="berita-featured-image">
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
      </div>

      <div className="berita-featured-content">
        <div>
          <span className="berita-featured-tag">Berita Terbaru</span>
          <h2 className="berita-featured-title">
            <Link href={`/berita/${item.slug || item.id}`}>
              {item.title}
            </Link>
          </h2>
          <div className="berita-featured-date">{date}</div>
          <p className="berita-featured-desc">
            {item.excerpt || item.content?.substring(0, 200).replace(/<[^>]+>/g, '') + '...'}
          </p>
        </div>

        <Link href={`/berita/${item.slug || item.id}`} className="berita-featured-btn">
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}
