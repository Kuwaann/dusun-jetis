import { Image as ImageIcon } from "lucide-react";

export default function ProfilQuoteBanner() {
  return (
    <div className="profil-quote-banner reveal">
      <div className="profil-quote-bg">
        <div className="image-placeholder">
          <ImageIcon size={24} />
          [Placeholder Gambar Banner Quote]
        </div>
      </div>
      <blockquote className="profil-quote-text">
        &quot;Dusun Jetis terus bergerak dinamis menyongsong masa depan yang sejahtera melalui optimalisasi potensi pertanian dan budaya lokal, sembari menjaga erat warisan sejarah serta keharmonisan masyarakat demi mewujudkan lingkungan yang inklusif, aman, dan nyaman untuk semua.&quot;
      </blockquote>
    </div>
  );
}
