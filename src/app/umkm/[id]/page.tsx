"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import UmkmDetailHeader from "@/components/UmkmDetailHeader";
import UmkmDetailMain from "@/components/UmkmDetailMain";
import UmkmDetailAbout from "@/components/UmkmDetailAbout";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

export default function UmkmDetailPage() {
  const [umkm, setUmkm] = useState<any>(null);
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
  }, [umkm]);

  useEffect(() => {
    if (params.id) {
      fetchUmkm();
    }
  }, [params.id]);

  const fetchUmkm = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("umkm")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      router.push("/umkm");
    } else {
      setUmkm(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
        Memuat detail UMKM...
      </div>
    );
  }

  if (!umkm) return null;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main style={{ paddingBottom: "40px" }}>
        {/* Back Link */}
        <div className="section reveal" style={{ marginTop: "40px", marginBottom: "-20px" }}>
          <Link href="/umkm" className="berita-detail-back" style={{ marginBottom: 0 }}>
            &lt; Kembali ke Daftar UMKM
          </Link>
        </div>

        {/* Detail Header */}
        <UmkmDetailHeader
          category={umkm.category}
          title={umkm.name}
        />

        {/* Hero Photo Box & Sidebar Contact Card */}
        <UmkmDetailMain
          owner={umkm.owner || "Pemilik UMKM"}
          whatsapp={umkm.whatsapp_number}
          address={umkm.address}
          mapsUrl={umkm.maps_link}
          linktreeUrl={umkm.linktree_link}
          image_url={umkm.image_url}
        />

        {/* Tentang UMKM */}
        <UmkmDetailAbout desc={umkm.description} />
      </main>
      <Footer />
    </div>
  );
}
