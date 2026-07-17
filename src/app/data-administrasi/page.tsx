"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import DataMetricCards from "@/components/DataMetricCards";
import DataRtDistribution from "@/components/DataRtDistribution";
import Footer from "@/components/Footer";

export default function DataAdministrasiPage() {
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
        {/* Data Header */}
        <section className="data-header reveal">
          <h1 className="data-header-title">Data &amp; Statistik Dusun Jetis</h1>
          <p className="data-header-desc">
            Ringkasan data kependudukan, distribusi wilayah, dan administratif Dusun Jetis per Januari 2026.
          </p>
        </section>

        {/* 6 Metric Cards */}
        <DataMetricCards />

        {/* RT Distribution Section with Progress Bars */}
        <DataRtDistribution />
      </main>
      <Footer />
    </div>
  );
}
