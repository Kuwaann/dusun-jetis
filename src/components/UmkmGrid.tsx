import { ShoppingBag, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

interface UmkmItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  href?: string;
  image_url?: string;
}

interface UmkmGridProps {
  items: UmkmItem[];
  searchQuery?: string;
}

export default function UmkmGrid({ items, searchQuery = "" }: UmkmGridProps) {
  return (
    <div className="section umkm-grid reveal">
      {items.length > 0 ? (
        items.map((item) => (
          <Link key={item.id} href={`/umkm/${item.id}`} className="umkm-card">
            <div className="umkm-card-image">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="image-placeholder">
                  <ShoppingBag size={24} />
                  [Tanpa Gambar]
                </div>
              )}
            </div>

            <div className="umkm-card-content">
              <div>
                <span className="umkm-badge">{item.category}</span>
                <h3 className="umkm-card-title">{item.title}</h3>
                <p className="umkm-card-desc">{item.desc}</p>
              </div>

              <div className="umkm-card-link">
                <span className="umkm-card-link-text">Pelajari Selanjutnya</span>
                <ArrowRightCircle size={18} strokeWidth={1.8} className="umkm-card-link-icon" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="empty-state">
          <ShoppingBag />
          <span>
            {searchQuery 
              ? "Tidak ada UMKM yang ditemukan cocok dengan kata kunci pencarian."
              : "Belum ada UMKM yang terdaftar saat ini."}
          </span>
        </div>
      )}
    </div>
  );
}
