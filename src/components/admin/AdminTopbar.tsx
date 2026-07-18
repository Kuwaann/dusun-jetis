"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Simulasi logout
    alert("Berhasil logout. (UI Preview)");
    router.push("/admin/login");
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-title">
        Dasbor Utama
      </div>
      
      <div className="admin-topbar-profile">
        <span>Halo, Admin Desa</span>
        <button onClick={handleLogout} className="admin-btn-logout">
          Keluar
        </button>
      </div>
    </header>
  );
}
