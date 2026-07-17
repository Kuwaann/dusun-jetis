export default function ProfilKepengurusan() {
  const pengurusList = [
    { name: "Lorem Ipsum", role: "Kepala Wilayah" },
    { name: "Lorem Ipsum", role: "Sekretaris Dusun" },
    { name: "Lorem Ipsum", role: "Bendahara Dusun" },
    { name: "Lorem Ipsum", role: "Ketua RT 05" },
    { name: "Lorem Ipsum", role: "Ketua RT 06" },
  ];

  return (
    <section className="section kepengurusan reveal">
      <div className="kepengurusan-header">
        <h2 className="kepengurusan-title">Struktur Kepengurusan Dusun Jetis</h2>
        <p className="kepengurusan-desc">
          Sinergi para pengurus dan perangkat kewilayahan Dusun Jetis yang berkomitmen penuh dalam memberikan pelayanan terbaik serta memajukan kesejahteraan warga.
        </p>
      </div>

      <div className="kepengurusan-grid">
        {pengurusList.map((item, idx) => (
          <div key={idx} className="pengurus-card">
            <div className="pengurus-photo">
              <div className="image-placeholder">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                [Placeholder Foto Pengurus]
              </div>
            </div>
            <div className="pengurus-name">{item.name}</div>
            <div className="pengurus-role">{item.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
