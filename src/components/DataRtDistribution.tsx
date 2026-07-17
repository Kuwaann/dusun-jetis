export default function DataRtDistribution() {
  const rtData = [
    {
      title: "RT 05",
      kk: "78",
      total: "96",
      maleText: "Laki-Laki: 48 (50%)",
      femaleText: "Perempuan: 48 (50%)",
      malePercent: 50,
      femalePercent: 50,
    },
    {
      title: "RT 06",
      kk: "78",
      total: "96",
      maleText: "Laki-Laki: 48 (50%)",
      femaleText: "Perempuan: 48 (50%)",
      malePercent: 50,
      femalePercent: 50,
    },
  ];

  return (
    <section className="section rt-distribution reveal">
      <div className="rt-header">
        <h2 className="rt-title">Persebaran Penduduk per RT</h2>
        <p className="rt-desc">
          Visualisasi proporsi jumlah KK, total penduduk, serta perbandingan gender di setiap wilayah Rukun Tetangga (RT) Dusun Jetis.
        </p>
      </div>

      <div className="rt-grid">
        {rtData.map((item, idx) => (
          <article key={idx} className="rt-card">
            <h3 className="rt-card-title">{item.title}</h3>
            
            <div className="rt-stat-row">
              <div className="rt-stat-group">
                <span className="rt-stat-label">Kepala Keluarga</span>
                <span className="rt-stat-val">{item.kk}</span>
              </div>
              <div className="rt-stat-group">
                <span className="rt-stat-label">Total Penduduk</span>
                <span className="rt-stat-val">{item.total}</span>
              </div>
            </div>

            <div className="rt-gender-row">
              <div className="rt-gender-item">
                <span className="rt-dot rt-dot-male"></span>
                <span>{item.maleText}</span>
              </div>
              <div className="rt-gender-item">
                <span className="rt-dot rt-dot-female"></span>
                <span>{item.femaleText}</span>
              </div>
            </div>

            <div className="rt-progress-bar">
              <div
                className="rt-progress-segment rt-progress-male"
                style={{ width: `${item.malePercent}%` }}
              ></div>
              <div
                className="rt-progress-segment rt-progress-female"
                style={{ width: `${item.femalePercent}%` }}
              ></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
