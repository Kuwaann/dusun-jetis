"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Hero() {
  const [latestNews, setLatestNews] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLatestNews() {
      const { data } = await supabase
        .from("berita")
        .select("id, title, slug, published_at, image_url")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(1)
        .single();
      
      if (data) setLatestNews(data);
    }
    fetchLatestNews();
  }, []);
  return (
    <section className="hero" id="beranda">
      <div className="hero-bg-placeholder">
        <img 
          src="/DSC00170.JPG" 
          alt="Banner Dusun Jetis" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-blur hero-blur-left"></div>
      <div className="hero-blur hero-blur-right"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Dusun<br />
          Jetis<span className="brand-dot">.</span>
        </h1>
        <p className="hero-location">Desa Jamuskauman, Kec. Ngluwar, Kab. Magelang</p>
      </div>

      {latestNews && (
        <Link className="story-card" href={`/berita/${latestNews.slug || latestNews.id}`} aria-label={`Baca berita ${latestNews.title}`}>
          <div className="story-image-wrap">
            {latestNews.image_url ? (
              <img 
                src={latestNews.image_url} 
                alt={latestNews.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="image-placeholder">
                <ImageIcon size={24} />
                [Tanpa Gambar]
              </div>
            )}
          </div>
          <div className="story-meta">
            <span>
              {latestNews.published_at 
                ? new Date(latestNews.published_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                : "Tanggal tidak diketahui"}
            </span>
            <span className="story-badge">Berita Terbaru</span>
          </div>
          <h2 className="story-title">
            {latestNews.title}
            <ArrowUpRight className="story-icon" size={16} strokeWidth={2} />
          </h2>
        </Link>
      )}
    </section>
  );
}
