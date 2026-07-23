"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import UmkmHeader from "@/components/UmkmHeader";
import UmkmGrid from "@/components/UmkmGrid";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

export default function UmkmPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allUmkmItems, setAllUmkmItems] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUmkm() {
      const { data } = await supabase.from("umkm").select("*").order("created_at", { ascending: false });
      if (data) {
        // Map data to match UmkmGrid's expected properties
        const mappedData = data.map(item => ({
          id: item.id,
          title: item.name,
          category: item.category,
          desc: item.description,
          image_url: item.image_url,
          href: `/umkm/${item.id}`,
        }));
        setAllUmkmItems(mappedData);
      }
    }
    fetchUmkm();
  }, []);

  const filteredItems = allUmkmItems.filter(
    (item) =>
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.desc || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {/* UMKM Header with Search Bar */}
        <UmkmHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 4x2 UMKM Grid */}
        <UmkmGrid items={filteredItems} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}
