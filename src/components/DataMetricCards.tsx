export default function DataMetricCards() {
  const metrics = [
    { number: "654", label: "Jumlah Penduduk" },
    { number: "96", label: "Jumlah Kepala Keluarga" },
    { number: "231", label: "Jumlah Perempuan" },
    { number: "423", label: "Jumlah Laki-Laki" },
    { number: "2", label: "Jumlah RT" },
    { number: "51%", label: "Rasio Gender" },
  ];

  return (
    <div className="section data-metrics-grid reveal">
      {metrics.map((item, idx) => (
        <article key={idx} className="data-metric-card">
          <div className="data-metric-number">{item.number}</div>
          <div className="data-metric-label">{item.label}</div>
        </article>
      ))}
    </div>
  );
}
