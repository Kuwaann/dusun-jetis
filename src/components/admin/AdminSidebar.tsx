"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Store, Newspaper, Image as ImageIcon, Users, Activity, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal melakukan logout.");
    } else {
      toast.success("Berhasil keluar.");
      router.push("/admin/login");
    }
  };

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

      <div style={{ marginTop: "auto", padding: "0 24px 24px" }}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="admin-nav-item" style={{ width: "100%", color: "#e65100" }}>
              <LogOut size={20} strokeWidth={1.5} />
              Keluar
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin keluar dari sesi admin? Anda harus masuk kembali untuk mengelola website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Ya, Keluar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}
