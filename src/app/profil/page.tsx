"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import ProfilQuoteBanner from "@/components/ProfilQuoteBanner";
import ProfilInfoCards from "@/components/ProfilInfoCards";
import ProfilVisiMisi from "@/components/ProfilVisiMisi";
import PetaLokasi from "@/components/PetaLokasi";
import ProfilKepengurusan from "@/components/ProfilKepengurusan";
import Footer from "@/components/Footer";

export default function ProfilPage() {
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
        {/* Profil Header */}
        <section className="profil-header reveal">
          <h1 className="profil-header-title">Profil Dusun Jetis</h1>
          <p className="profil-header-desc">
            Selamat datang di halaman Profil Resmi Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang. Halaman ini menyajikan informasi komprehensif mengenai sejarah, nilai dasar, struktur tata kelola, serta orientasi geografis wilayah kami.
          </p>
        </section>

        {/* Quote Banner */}
        <ProfilQuoteBanner />

        {/* Info Cards (Identitas Wilayah, Kondisi Umum, Potensi Lokal) */}
        <ProfilInfoCards />

        {/* Visi & Misi */}
        <ProfilVisiMisi />

        {/* Peta Lokasi */}
        <PetaLokasi />

        {/* Struktur Kepengurusan */}
        <ProfilKepengurusan />
      </main>
      <Footer />
    </div>
  );
}
