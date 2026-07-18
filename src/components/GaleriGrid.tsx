"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, X } from "lucide-react";

export default function GaleriGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const items = Array.from({ length: 9 }, (_, idx) => idx + 1);

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
        {items.map((num) => (
          <div
            key={num}
            className="galeri-card"
            onClick={() => setSelectedImage(num)}
            role="button"
            tabIndex={0}
            aria-label={`Buka foto dokumentasi #${num}`}
          >
            <div className="galeri-image-wrap">
              <div className="image-placeholder galeri-zoom-target">
                <ImageIcon size={24} />
                [Placeholder Foto Dokumentasi #{num}]
              </div>
            </div>
          </div>
        ))}
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
              <div className="image-placeholder galeri-modal-placeholder">
                <ImageIcon size={56} />
                <span style={{ fontSize: "15px", marginTop: "10px", fontWeight: 600 }}>
                  [Foto Dokumentasi #{selectedImage} - Tampilan Membesar Pop-Up]
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
