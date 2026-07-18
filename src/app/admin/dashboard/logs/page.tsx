"use client";

import { useState } from "react";

export default function LogAktivitasPage() {
  const [filterModul, setFilterModul] = useState("Semua");

  const dummyLogs = [
    { id: 1, waktu: "18 Jul 2026, 08:30", pengguna: "Budi Santoso", aksi: "Menambahkan Akun Baru", detail: "Akun: agus_staf", modul: "Akun", tipe: "CREATE" },
    { id: 2, waktu: "18 Jul 2026, 08:15", pengguna: "Siti Rahmawati", aksi: "Memperbarui UMKM", detail: "UMKM ID: 15 (Warung Sate Bu Pon)", modul: "UMKM", tipe: "UPDATE" },
    { id: 3, waktu: "17 Jul 2026, 16:45", pengguna: "Budi Santoso", aksi: "Menghapus Berita", detail: "Berita ID: 3 (Jadwal Ronda)", modul: "Berita", tipe: "DELETE" },
    { id: 4, waktu: "17 Jul 2026, 14:20", pengguna: "Siti Rahmawati", aksi: "Menambahkan Foto Galeri", detail: "Foto ID: 42", modul: "Galeri", tipe: "CREATE" },
    { id: 5, waktu: "17 Jul 2026, 09:00", pengguna: "Budi Santoso", aksi: "Login ke Sistem", detail: "IP: 192.168.1.5", modul: "Sistem", tipe: "INFO" },
    { id: 6, waktu: "16 Jul 2026, 13:10", pengguna: "Siti Rahmawati", aksi: "Memperbarui Profil", detail: "Mengubah alamat email", modul: "Akun", tipe: "UPDATE" },
  ];

  const filteredLogs = filterModul === "Semua" ? dummyLogs : dummyLogs.filter(log => log.modul === filterModul);

  const getActionColor = (tipe: string) => {
    switch (tipe) {
      case "CREATE": return { bg: "#e3f2fd", color: "#1565c0" }; // Biru
      case "UPDATE": return { bg: "#fff8e1", color: "#f57f17" }; // Kuning/Oranye
      case "DELETE": return { bg: "#ffebee", color: "#c62828" }; // Merah
      default: return { bg: "#f5f5f5", color: "#616161" };       // Abu-abu
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Log Aktivitas</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Riwayat seluruh tindakan yang dilakukan oleh pengguna di dalam panel admin.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}>Filter:</span>
          <select 
            className="admin-input" 
            style={{ width: "160px", padding: "8px 12px" }}
            value={filterModul}
            onChange={(e) => setFilterModul(e.target.value)}
          >
            <option value="Semua">Semua Modul</option>
            <option value="Sistem">Sistem</option>
            <option value="Akun">Akun</option>
            <option value="UMKM">UMKM</option>
            <option value="Berita">Berita</option>
            <option value="Galeri">Galeri</option>
          </select>
        </div>
      </div>

      <div className="admin-panel-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "160px" }}>Waktu</th>
              <th>Pengguna</th>
              <th>Modul</th>
              <th>Tindakan</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const colors = getActionColor(log.tipe);
                return (
                  <tr key={log.id}>
                    <td style={{ fontSize: "13px", color: "var(--muted)" }}>{log.waktu}</td>
                    <td style={{ fontWeight: 600 }}>{log.pengguna}</td>
                    <td>
                      <span style={{ 
                        padding: "2px 8px", 
                        border: "1px solid var(--line)", 
                        borderRadius: "12px", 
                        fontSize: "11px", 
                        fontWeight: 600,
                        color: "var(--muted)",
                        background: "var(--soft-white)"
                      }}>
                        {log.modul}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        padding: "4px 8px", 
                        background: colors.bg, 
                        color: colors.color, 
                        borderRadius: "4px", fontSize: "12px", fontWeight: 600 
                      }}>
                        {log.aksi}
                      </span>
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>{log.detail}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
                  Tidak ada log aktivitas untuk modul {filterModul}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
