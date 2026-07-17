"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import GaleriGrid from "@/components/GaleriGrid";
import Footer from "@/components/Footer";

export default function GaleriPage() {
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
        {/* Galeri Header */}
        <section className="galeri-header reveal">
          <h1 className="galeri-header-title">Galeri Dokumentasi</h1>
          <p className="galeri-header-desc">
            Potret ragam aktivitas, kebersamaan warga, dan momen-momen berharga dalam derap langkah pembangunan di Dusun Jetis.
          </p>
        </section>

        {/* 3x3 Gallery Grid with 1.2s Hover Zoom */}
        <GaleriGrid />
      </main>
      <Footer />
    </div>
  );
}
