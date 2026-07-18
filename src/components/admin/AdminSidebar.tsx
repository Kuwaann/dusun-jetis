"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Newspaper, Image as ImageIcon, Users, Activity } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dasbor Utama", path: "/admin/dashboard", icon: Home },
    { name: "Kelola UMKM", path: "/admin/dashboard/umkm", icon: Store },
    { name: "Kelola Berita", path: "/admin/dashboard/berita", icon: Newspaper },
    { name: "Kelola Galeri", path: "/admin/dashboard/galeri", icon: ImageIcon },
    { name: "Manajemen Akun", path: "/admin/dashboard/akun", icon: Users },
    { name: "Log Aktivitas", path: "/admin/dashboard/logs", icon: Activity },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-brand" style={{ fontSize: '28px' }}>
          Admin<span className="admin-brand-dot">.</span>
        </div>
      </div>
      
      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`admin-nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <Icon size={20} strokeWidth={1.5} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
