export default function DataMetricCards() {
  const metrics = [
    { number: "245", label: "Jumlah Penduduk" },
    { number: "83", label: "Kepala Keluarga (KK)" },
    { number: "73", label: "Kepala Rumah Tangga (KRT)" },
    { number: "119", label: "Jumlah Laki-Laki" },
    { number: "126", label: "Jumlah Perempuan" },
    { number: "2", label: "Jumlah RT" },
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
