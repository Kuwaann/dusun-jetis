"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import UmkmDetailHeader from "@/components/UmkmDetailHeader";
import UmkmDetailMain from "@/components/UmkmDetailMain";
import UmkmDetailAbout from "@/components/UmkmDetailAbout";
import Footer from "@/components/Footer";

export default function UmkmDetailPage() {
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
        {/* Detail Header */}
        <UmkmDetailHeader
          category="Jajanan"
          title="Bakpau Pak Lorem Ipsum"
        />

        {/* Hero Photo Box & Sidebar Contact Card */}
        <UmkmDetailMain
          address="Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang, Jawa Tengah."
          whatsapp="+6283867324215"
          mapsUrl="https://maps.google.com"
          linktreeUrl="#"
        />

        {/* Tentang UMKM */}
        <UmkmDetailAbout />
      </main>
      <Footer />
    </div>
  );
}
