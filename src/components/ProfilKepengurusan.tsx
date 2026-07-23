import { User } from "lucide-react";

export default function ProfilKepengurusan() {
  const pengurusList = [
    { name: "Lorem Ipsum", role: "Kepala Wilayah" },
    { name: "Lorem Ipsum", role: "Badan Permusyawaratan Desa" },
    { name: "Lorem Ipsum", role: "Ketua RW 07" },
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
                <User size={24} />
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
