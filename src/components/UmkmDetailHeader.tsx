interface UmkmDetailHeaderProps {
  category: string;
  title: string;
}

export default function UmkmDetailHeader({ category, title }: UmkmDetailHeaderProps) {
  return (
    <section className="section umkm-detail-header reveal">
      <div className="umkm-detail-category">{category}</div>
      <h1 className="umkm-detail-title">{title}</h1>
    </section>
  );
}
