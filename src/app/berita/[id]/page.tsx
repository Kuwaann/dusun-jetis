"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function BeritaDetailPage() {
  const [berita, setBerita] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
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
  }, [berita]);

  useEffect(() => {
    if (params.id) {
      fetchBerita();
    }
  }, [params.id]);

  const fetchBerita = async () => {
    setIsLoading(true);
    // Cek apakah id itu numeric atau slug
    const isNumeric = /^\d+$/.test(params.id as string);
    let query = supabase.from("berita").select("*").eq("status", "published");
    
    if (isNumeric) {
      query = query.eq("id", params.id);
    } else {
      query = query.eq("slug", params.id);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      router.push("/berita");
    } else {
      setBerita(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
        Memuat berita...
      </div>
    );
  }

  if (!berita) return null;

  const date = berita.published_at 
    ? new Date(berita.published_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : "Tanggal tidak diketahui";

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main style={{ paddingBottom: "60px" }}>
        <section className="section berita-detail-container reveal">
          {/* Back Link */}
          <Link href="/berita" className="berita-detail-back">
            &lt; Kembali ke Berita
          </Link>

          {/* Article Title & Date */}
          <div className="berita-detail-header">
            <h1 className="berita-detail-title">
              {berita.title}
            </h1>
            <div className="berita-detail-date">{date}</div>
          </div>

          {/* Hero Image */}
          <div className="berita-detail-hero">
            {berita.image_url ? (
              <img 
                src={berita.image_url} 
                alt={berita.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              />
            ) : (
              <div className="image-placeholder">
                <Newspaper size={24} />
                [Tanpa Gambar]
              </div>
            )}
          </div>

          {/* Article Content */}
          <article 
            className="berita-detail-body" 
            dangerouslySetInnerHTML={{ __html: berita.content }}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
