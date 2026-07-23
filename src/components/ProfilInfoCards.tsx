import { User, Users, Globe } from "lucide-react";

export default function ProfilInfoCards() {
  return (
    <div className="info-card-list section reveal">
      <article className="info-card">
        <div className="info-card-header">
          <User size={20} strokeWidth={1.8} />
          <h3>Identitas Wilayah</h3>
        </div>
        <div className="info-card-body">
          <p>
            Dusun Jetis merupakan salah satu dusun yang berada di wilayah Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang, Provinsi Jawa Tengah. Dusun ini terdiri atas dua wilayah Rukun Tetangga (RT), yaitu RT 05 dan RT 06.
          </p>
          <p>
            Pemerintahan dusun dipimpin oleh Kepala Wilayah yang dibantu oleh para Ketua RT dalam menyelenggarakan pelayanan kepada masyarakat serta pelaksanaan pembangunan di tingkat dusun.
          </p>
        </div>
      </article>

      <article className="info-card">
        <div className="info-card-header">
          <Users size={20} strokeWidth={1.8} />
          <h3>Kondisi Umum</h3>
        </div>
        <div className="info-card-body">
          <p>
            Dusun Jetis merupakan kawasan permukiman yang memiliki lingkungan asri dengan kehidupan masyarakat yang masih menjunjung tinggi nilai gotong royong, kekeluargaan, dan kebersamaan. Kehidupan sosial masyarakat berjalan dengan harmonis melalui berbagai kegiatan kemasyarakatan, keagamaan, maupun pembangunan lingkungan yang dilaksanakan secara bersama-sama.
          </p>
          <p>
            Berdasarkan data administrasi Dusun Jetis, jumlah penduduk mencapai 245 jiwa yang terdiri atas 119 laki-laki dan 126 perempuan, dengan total 83 Kepala Keluarga (KK). Persebaran penduduk tersebut tersebar di dua wilayah RT (RT 05 dan RT 06).
          </p>
        </div>
      </article>

      <article className="info-card">
        <div className="info-card-header">
          <Globe size={20} strokeWidth={1.8} />
          <h3>Potensi Lokal</h3>
        </div>
        <div className="info-card-body">
          <p>
            Dusun Jetis memiliki potensi lokal yang didukung oleh kondisi geografis serta sumber daya masyarakat. Sebagian wilayah dusun dimanfaatkan sebagai area pertanian yang menjadi salah satu sumber mata pencaharian masyarakat. Selain itu, masyarakat Jetis juga memiliki semangat gotong royong yang kuat dalam mendukung berbagai kegiatan sosial, pembangunan, dan pelestarian lingkungan.
          </p>
        </div>
      </article>
    </div>
  );
}
