"use client";

import { useRef } from "react";
import Link from "next/link";

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
          <Link href="/berita" className="section-link">
            Lihat Lainnya ↗
          </Link>
        </div>

        <div className="carousel-nav">
          <button
            className="carousel-btn"
            type="button"
            aria-label="Berita sebelumnya"
            onClick={() => handleScroll("left")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="carousel-btn"
            type="button"
            aria-label="Berita berikutnya"
            onClick={() => handleScroll("right")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="news-track" ref={scrollRef}>
        {newsItems.map((item) => (
          <article key={item.id} className="news-card">
            <Link href={`/berita/${item.id}`}>
              <div className="news-image">
                <div className="image-placeholder">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M9 12h6m-6 3h6" />
                  </svg>
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
