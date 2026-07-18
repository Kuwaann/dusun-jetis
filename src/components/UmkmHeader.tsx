"use client";

import { Search } from "lucide-react";

interface UmkmHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export default function UmkmHeader({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: UmkmHeaderProps) {
  return (
    <section className="section umkm-header-section reveal">
      <div className="umkm-header-row">
        <h1 className="umkm-header-title">UMKM Dusun Jetis</h1>

        <div className="umkm-header-right">
          <p className="umkm-header-desc">
            Jelajahi berbagai usaha lokal warga Dusun Jetis yang terdapat pada Dusun Jetis.
          </p>

          <form
            className="umkm-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
          >
            <div className="umkm-search-input-wrap">
              <input
                type="text"
                placeholder="Cari UMKM..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="umkm-search-input"
              />
              <Search className="umkm-search-icon" size={16} strokeWidth={1.8} />
            </div>
            <button type="submit" className="umkm-search-btn">
              Cari UMKM
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
