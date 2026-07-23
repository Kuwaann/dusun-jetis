"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Activity {
  id: number;
  action: string;
  description: string;
  waktu: string;
  pengguna: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    umkm: 0,
    berita: 0,
    galeri: 0,
    admin: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch counts
      const [umkmCount, beritaCount, galeriCount, profilesCount] = await Promise.all([
        supabase.from("umkm").select("id", { count: "exact", head: true }),
        supabase.from("berita").select("id", { count: "exact", head: true }),
        supabase.from("galeri").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        umkm: umkmCount.count || 0,
        berita: beritaCount.count || 0,
        galeri: galeriCount.count || 0,
        admin: profilesCount.count || 0,
      });

      // 2. Fetch latest 5 activity logs
      const { data: logs, error: logsError } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (logsError) throw logsError;

      // 3. Fetch profiles for user names
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name");

      if (profilesError) throw profilesError;

      const profileMap: Record<string, string> = {};
      profiles?.forEach((p) => {
        profileMap[p.id] = p.full_name;
      });

      const formattedActivities = (logs || []).map((log) => ({
        id: log.id,
        action: `${log.action} ${log.module}`,
        description: log.description,
        waktu: new Date(log.created_at).toLocaleString("id-ID", {
          day: 'numeric', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }),
        pengguna: profileMap[log.user_id] || "Sistem / User Terhapus",
      }));

      setRecentActivities(formattedActivities);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>Selamat Datang, Admin</h1>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          Berikut adalah ringkasan data dan aktivitas terbaru di website Dusun Jetis.
        </p>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total UMKM</div>
          <div className="admin-stat-value">{isLoading ? "..." : stats.umkm}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Berita</div>
          <div className="admin-stat-value">{isLoading ? "..." : stats.berita}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Foto Galeri</div>
          <div className="admin-stat-value">{isLoading ? "..." : stats.galeri}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Admin</div>
          <div className="admin-stat-value">{isLoading ? "..." : stats.admin}</div>
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="admin-panel-header">
          Aktivitas Terbaru
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Aktivitas</th>
              <th>Detail</th>
              <th>Waktu</th>
              <th>Pengguna</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "var(--muted)" }}>Memuat aktivitas terbaru...</td>
              </tr>
            ) : recentActivities.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "var(--muted)" }}>Belum ada log aktivitas.</td>
              </tr>
            ) : (
              recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td style={{ fontWeight: 500, textTransform: "capitalize" }}>{activity.action}</td>
                  <td>{activity.description}</td>
                  <td>{activity.waktu}</td>
                  <td>{activity.pengguna}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
