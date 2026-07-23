
import { User } from "lucide-react";

export default function Profil() {
  return (
    <section className="section welcome reveal" id="profil">
      <div className="welcome-media">
        <div className="image-placeholder">
          <User size={32} />
          [Foto Kepala Wilayah]
        </div>
      </div>

      <div className="welcome-copy">
        <h2 className="welcome-title">
          Sambutan Kepala Wilayah,<br />
          Dusun Jetis
        </h2>
        <p className="welcome-text">
          Selamat datang di portal resmi Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang. Media informasi digital ini hadir sebagai wujud transparansi, keterbukaan informasi, serta sarana komunikasi interaktif antara pemerintah dusun dengan seluruh warga maupun masyarakat luas.
        </p>
        <p className="welcome-text" style={{ marginTop: '16px' }}>
          Melalui optimalisasi potensi lokal di bidang pertanian, UMKM, serta keharmonisan sosial yang erat, kami berkomitmen untuk terus mewujudkan lingkungan dusun yang sejahtera, mandiri, dan berbudaya. Semoga kehadiran website ini memberikan manfaat nyata bagi kemajuan Dusun Jetis tercinta.
        </p>
        <p className="welcome-text" style={{ marginTop: '24px', fontWeight: '600', color: 'var(--black)' }}>
          Salam hangat,<br />
          Kepala Wilayah Dusun Jetis
        </p>
      </div>
    </section>
  );
}
