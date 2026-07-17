export default function ProfilVisiMisi() {
  const misiItems = [
    "Mengoptimalkan potensi pertanian komoditas unggulan melalui sistem tata kelola modern.",
    "Melestarikan kesenian daerah dan permainan tradisional sebagai identitas budaya lokal.",
    "Mewujudkan tata kelola wilayah yang transparan, responsif terhadap aspirasi warga, dan inklusif.",
    "Meningkatkan kualitas sumber daya manusia melalui ruang edukasi publik \"Kampoeng Dolanan\".",
  ];

  return (
    <div className="section visi-misi-grid reveal">
      <div className="visi-card">
        <div className="visi-misi-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <h3>Visi Dusun</h3>
        </div>
        <p className="visi-text">
          Mewujudkan Dusun Jetis yang Mandiri, Sejahtera, Berbudaya, dan Unggul dalam Sektor Agraris serta Edukasi Ramah Anak.
        </p>
      </div>

      <div className="misi-card">
        <div className="visi-misi-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Misi Dusun</h3>
        </div>
        <div className="misi-list">
          {misiItems.map((text, idx) => (
            <div key={idx} className="misi-item">
              <span className="misi-item-num">{idx + 1}.</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
