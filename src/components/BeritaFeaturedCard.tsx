import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function BeritaFeaturedCard() {
  return (
    <div className="section berita-featured-card reveal">
      <div className="berita-featured-image">
        <div className="image-placeholder">
          <Newspaper size={24} />
          [Placeholder Foto Berita Utama]
        </div>
      </div>

      <div className="berita-featured-content">
        <div>
          <span className="berita-featured-tag">Berita Terbaru</span>
          <h2 className="berita-featured-title">
            <Link href="/berita/1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Link>
          </h2>
          <div className="berita-featured-date">Selasa, 14 Juli 2026</div>
          <p className="berita-featured-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Ves...
          </p>
        </div>

        <Link href="/berita/1" className="berita-featured-btn">
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}
