export default function UmkmDetailAbout({ desc }: { desc?: string }) {
  if (!desc) return null;

  return (
    <section className="section umkm-detail-about reveal">
      <h2 className="umkm-about-title">Tentang UMKM</h2>

      <div className="umkm-about-text">
        <p>{desc}</p>
      </div>
    </section>
  );
}
