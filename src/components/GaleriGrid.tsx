"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GaleriItem {
  id: number;
  image_url: string;
  title: string;
}

export default function GaleriGrid() {
  const [selectedImage, setSelectedImage] = useState<GaleriItem | null>(null);
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchGaleri() {
      const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
      if (data) setItems(data);
      setIsLoading(false);
    }
    fetchGaleri();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="section galeri-grid reveal">
        {isLoading ? (
          <div style={{ padding: "40px", textAlign: "center", width: "100%", gridColumn: "1 / -1" }}>Memuat galeri...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <ImageIcon />
            <span>Belum ada foto galeri.</span>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="galeri-card"
              onClick={() => setSelectedImage(item)}
              role="button"
              tabIndex={0}
              aria-label={`Buka foto dokumentasi ${item.title || item.id}`}
            >
              <div className="galeri-image-wrap">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title || "Galeri Dusun Jetis"}
                    className="galeri-zoom-target"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="image-placeholder galeri-zoom-target">
                    <ImageIcon size={24} />
                    [Tanpa Gambar]
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pop-up Modal Lightbox */}
      {selectedImage !== null && (
        <div
          className="galeri-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="galeri-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="galeri-modal-close"
              onClick={() => setSelectedImage(null)}
              type="button"
              aria-label="Tutup foto"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <div className="galeri-modal-image-wrap">
              {selectedImage.image_url ? (
                <>
                  <img 
                    src={selectedImage.image_url} 
                    alt={selectedImage.title || "Galeri Pop-up"}
                    style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain' }}
                  />
                  {selectedImage.title && (
                    <div style={{ padding: "16px", textAlign: "center", color: "#fff", background: "rgba(0,0,0,0.8)" }}>
                      {selectedImage.title}
                    </div>
                  )}
                </>
              ) : (
                <div className="image-placeholder galeri-modal-placeholder">
                  <ImageIcon size={56} />
                  <span style={{ fontSize: "15px", marginTop: "10px", fontWeight: 600 }}>
                    [Tanpa Gambar]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
