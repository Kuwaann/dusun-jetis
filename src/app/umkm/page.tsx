"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import UmkmHeader from "@/components/UmkmHeader";
import UmkmGrid from "@/components/UmkmGrid";
import Footer from "@/components/Footer";

export default function UmkmPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allUmkmItems = [
    {
      id: 1,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 2,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 3,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 4,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 5,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 6,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 7,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
    {
      id: 8,
      title: "Bakpau Pak Lorem Ipsum",
      category: "Jajanan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrice.",
      href: "#",
    },
  ];

  const filteredItems = allUmkmItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
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
        <UmkmGrid items={filteredItems} />
      </main>
      <Footer />
    </div>
  );
}
