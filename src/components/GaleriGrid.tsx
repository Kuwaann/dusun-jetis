"use client";

import { useState, useEffect } from "react";

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
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="galeri-modal-image-wrap">
              <div className="image-placeholder galeri-modal-placeholder">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "56px", height: "56px" }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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
