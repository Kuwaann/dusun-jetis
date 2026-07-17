"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isProfilPage = pathname === "/profil";
  const isDataPage = pathname === "/data-administrasi" || pathname === "/data";
  const isUmkmPage = pathname.startsWith("/umkm");
  const isGaleriPage = pathname === "/galeri";
  const isBeritaPage = pathname.startsWith("/berita");
  const isHomePage = pathname === "/";

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Navigasi utama">
        <Link href="/" className="brand">
          Jetis<span className="brand-dot">.</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`} id="navLinks">
          <Link className={isHomePage ? "active" : ""} href="/#beranda">
            Beranda
          </Link>
          <Link className={isProfilPage ? "active" : ""} href="/profil">
            Profil
          </Link>
          <Link className={isDataPage ? "active" : ""} href="/data-administrasi">
            Data Administrasi
          </Link>
          <Link className={isUmkmPage ? "active" : ""} href="/umkm">
            UMKM
          </Link>
          <Link className={isGaleriPage ? "active" : ""} href="/galeri">
            Galeri
          </Link>
          <Link className={isBeritaPage ? "active" : ""} href="/berita">
            Berita
          </Link>
          <Link className="nav-contact" href="/#kontak">
            Kontak
          </Link>
        </div>

        <button
          className="mobile-toggle"
          id="mobileToggle"
          type="button"
          aria-label="Buka menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
