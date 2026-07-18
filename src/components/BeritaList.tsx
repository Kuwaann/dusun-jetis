import Link from "next/link";
import { Newspaper, ArrowRightCircle } from "lucide-react";

export default function BeritaList() {
  const articles = [
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "Selasa, 14 Juli 2026",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales s...",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "Selasa, 14 Juli 2026",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales s...",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "Selasa, 14 Juli 2026",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales s...",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "Selasa, 14 Juli 2026",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales s...",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "Selasa, 14 Juli 2026",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales s...",
    },
  ];

  return (
    <div className="section berita-list reveal">
      {articles.map((item) => (
        <article key={item.id} className="berita-item-card">
          <div className="berita-item-image">
            <Link href={`/berita/${item.id}`}>
              <div className="image-placeholder">
                <Newspaper size={24} />
                [Placeholder Foto]
              </div>
            </Link>
          </div>

          <div className="berita-item-content">
            <h3 className="berita-item-title">
              <Link href={`/berita/${item.id}`}>{item.title}</Link>
            </h3>
            <div className="berita-item-date">{item.date}</div>
            <p className="berita-item-excerpt">{item.excerpt}</p>
            <Link href={`/berita/${item.id}`} className="berita-item-link">
              <span>Baca Selengkapnya</span>
              <ArrowRightCircle size={14} strokeWidth={1.6} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
