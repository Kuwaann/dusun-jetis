"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

export default function Berita() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const newsItems = [
    {
      id: 1,
      title: "BimBel Bersama Mahasiswa KKN di Dusun Jetis",
      date: "Selasa, 14 Juli 2026",
    },
    {
      id: 2,
      title: "Kerja Bakti Rutin Warga Dusun Jetis Menjelang Musim Hujan",
      date: "Minggu, 12 Juli 2026",
    },
    {
      id: 3,
      title: "Pelatihan Pengolahan Hasil Pertanian bersama Kelompok Tani",
      date: "Jumat, 10 Juli 2026",
    },
    {
      id: 4,
      title: "Kegiatan Posyandu dan Pemeriksaan Kesehatan Lansia",
      date: "Rabu, 8 Juli 2026",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section reveal" id="berita">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">Berita Terbaru</h2>
          <Link href="/berita" className="section-link" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Lihat Lainnya <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="carousel-nav">
          <button
            className="carousel-btn"
            type="button"
            aria-label="Berita sebelumnya"
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className="carousel-btn"
            type="button"
            aria-label="Berita berikutnya"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="news-track" ref={scrollRef}>
        {newsItems.map((item) => (
          <article key={item.id} className="news-card">
            <Link href={`/berita/${item.id}`}>
              <div className="news-image">
                <div className="image-placeholder">
                  <Newspaper size={24} />
                  [Placeholder Foto Berita]
                </div>
              </div>
            </Link>
            <div className="news-date">{item.date}</div>
            <h3 className="news-card-title">
              <Link href={`/berita/${item.id}`}>{item.title}</Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
