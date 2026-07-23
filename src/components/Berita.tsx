"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface BeritaItem {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  image_url: string;
}

export default function Berita() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newsItems, setNewsItems] = useState<BeritaItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBerita() {
      const { data } = await supabase
        .from("berita")
        .select("id, title, slug, published_at, image_url")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(6);
      
      if (data) {
        setNewsItems(data);
      }
    }
    fetchBerita();
  }, []);

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
        {newsItems.length === 0 ? (
          <div className="empty-state" style={{ width: '100%' }}>
            <Newspaper />
            <span>Belum ada berita yang dipublikasikan saat ini.</span>
          </div>
        ) : (
          newsItems.map((item) => {
            const date = item.published_at 
              ? new Date(item.published_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : "Tanggal tidak diketahui";

            return (
              <article key={item.id} className="news-card">
                <Link href={`/berita/${item.slug || item.id}`}>
                  <div className="news-image">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <Newspaper size={24} />
                        [Tanpa Gambar]
                      </div>
                    )}
                  </div>
                </Link>
                <div className="news-date">{date}</div>
                <h3 className="news-card-title">
                  <Link href={`/berita/${item.slug || item.id}`}>{item.title}</Link>
                </h3>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
