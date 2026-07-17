"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import BeritaFeaturedCard from "@/components/BeritaFeaturedCard";
import BeritaList from "@/components/BeritaList";
import Footer from "@/components/Footer";

export default function BeritaPage() {
  useEffect(() => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll(".reveal");

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main style={{ paddingBottom: "40px" }}>
        {/* Berita Header */}
        <section className="berita-header reveal">
          <h1 className="berita-header-title">Berita dari Dusun Jetis</h1>
          <p className="berita-header-desc">
            Ikuti perkembangan terbaru, agenda warga, pembangunan wilayah di Dusun Jetis.
          </p>
        </section>

        {/* Hero Card Berita Utama */}
        <BeritaFeaturedCard />

        {/* Stack 5 Berita Horizontal */}
        <BeritaList />
      </main>
      <Footer />
    </div>
  );
}
