import Link from "next/link";

export default function BeritaFeaturedCard() {
  return (
    <div className="section berita-featured-card reveal">
      <div className="berita-featured-image">
        <div className="image-placeholder">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M9 12h6m-6 3h6" />
          </svg>
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
