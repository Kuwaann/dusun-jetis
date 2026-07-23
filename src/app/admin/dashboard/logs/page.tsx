"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Log {
  id: number;
  created_at: string;
  module: string;
  action: string;
  description: string;
  user_id: string;
  pengguna?: string;
}

export default function LogAktivitasPage() {
  const [filterModul, setFilterModul] = useState("Semua");
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch logs
      const { data: logsData, error: logsError } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100); // Limit to latest 100 for performance

      if (logsError) throw logsError;

      // 2. Fetch profiles for names
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name");
      
      if (profilesError) throw profilesError;

      const profileMap: Record<string, string> = {};
      profilesData?.forEach((p) => {
        profileMap[p.id] = p.full_name;
      });

      // 3. Map logs with names
      const formattedLogs = logsData?.map(log => ({
        ...log,
        pengguna: profileMap[log.user_id] || "Sistem / User Terhapus",
        waktu: new Date(log.created_at).toLocaleString("id-ID", {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      })) as any;

      setLogs(formattedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = filterModul === "Semua" ? logs : logs.filter(log => log.module?.toLowerCase() === filterModul.toLowerCase());

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
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
                  Memuat log aktivitas...
                </td>
              </tr>
            ) : filteredLogs.length > 0 ? (
              filteredLogs.map((log: any) => {
                const colors = getActionColor(log.action);
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
                        background: "var(--soft-white)",
                        textTransform: "capitalize"
                      }}>
                        {log.module}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        padding: "4px 8px", 
                        background: colors.bg, 
                        color: colors.color, 
                        borderRadius: "4px", fontSize: "12px", fontWeight: 600 
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>{log.description}</td>
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
