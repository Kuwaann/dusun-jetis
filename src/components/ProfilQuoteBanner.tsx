export default function ProfilQuoteBanner() {
  return (
    <div className="profil-quote-banner reveal">
      <div className="profil-quote-bg">
        <img 
          src="/DSC02141.JPG" 
          alt="Banner Quote Dusun Jetis" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
        />
      </div>
      <blockquote className="profil-quote-text">
        &quot;Dusun Jetis terus bergerak dinamis menyongsong masa depan yang sejahtera melalui optimalisasi potensi pertanian dan budaya lokal, sembari menjaga erat warisan sejarah serta keharmonisan masyarakat demi mewujudkan lingkungan yang inklusif, aman, dan nyaman untuk semua.&quot;
      </blockquote>
    </div>
  );
}
