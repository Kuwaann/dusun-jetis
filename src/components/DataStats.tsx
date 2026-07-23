"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DataStats() {
  const [stats, setStats] = useState({ umkm: 8 }); // Fallback defaults
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { count } = await supabase.from("umkm").select("id", { count: "exact", head: true });

      setStats({
        umkm: count || 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <section className="section stats reveal" id="data">
      <h2 className="stats-heading">
        Data dan Statistik Wilayah Terkini Tahun 2026
      </h2>

      <article className="stat">
        <strong className="stat-number">245</strong>
        <span className="stat-label">Jumlah Penduduk</span>
      </article>

      <article className="stat">
        <strong className="stat-number">83</strong>
        <span className="stat-label">Jumlah Kepala Keluarga</span>
      </article>

      <article className="stat" id="umkm">
        <strong className="stat-number">{stats.umkm}</strong>
        <span className="stat-label">Jumlah UMKM Aktif</span>
      </article>
    </section>
  );
}
