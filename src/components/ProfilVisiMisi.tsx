import { Target, ClipboardCheck } from "lucide-react";

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
          <Target size={20} strokeWidth={1.8} />
          <h3>Visi Dusun</h3>
        </div>
        <p className="visi-text">
          Mewujudkan Dusun Jetis yang Mandiri, Sejahtera, Berbudaya, dan Unggul dalam Sektor Agraris serta Edukasi Ramah Anak.
        </p>
      </div>

      <div className="misi-card">
        <div className="visi-misi-title">
          <ClipboardCheck size={20} strokeWidth={1.8} />
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
