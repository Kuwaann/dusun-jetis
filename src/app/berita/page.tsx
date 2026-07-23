"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BeritaFeaturedCard from "@/components/BeritaFeaturedCard";
import BeritaList from "@/components/BeritaList";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function BeritaPage() {
  const [featuredNews, setFeaturedNews] = useState<any>(null);
  const [otherNews, setOtherNews] = useState<any[]>([]);
  const supabase = createClient();
  
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

    revealElements.forEach((el) => {
      if (!el.classList.contains("visible")) {
        revealObserver.observe(el);
      }
    });

    return () => {
      revealObserver.disconnect();
    };
  }, [featuredNews]);

  useEffect(() => {
    async function fetchBerita() {
      const { data } = await supabase
        .from("berita")
        .select("id, title, slug, excerpt, content, published_at, image_url")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setFeaturedNews(data[0]);
        setOtherNews(data.slice(1));
      }
    }
    fetchBerita();
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

        {/* Berita List or Empty State */}
        {!featuredNews ? (
          <div className="empty-state reveal" style={{ width: 'var(--container)', margin: '60px auto 0' }}>
            <Newspaper />
            <span>Belum ada berita yang dipublikasikan saat ini.</span>
          </div>
        ) : (
          <>
            {/* Hero Card Berita Utama */}
            <BeritaFeaturedCard item={featuredNews} />

            {/* Stack 5 Berita Horizontal */}
            <BeritaList items={otherNews} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
