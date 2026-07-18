"use client";

export default function DashboardPage() {
  const recentActivities = [
    { id: 1, action: "Menambahkan Berita Baru", title: "Kerja Bakti Minggu Pagi", date: "15 Juli 2026, 09:30", user: "Admin Utama" },
    { id: 2, action: "Memperbarui Data UMKM", title: "Keripik Singkong Bu Tejo", date: "14 Juli 2026, 14:15", user: "Admin Utama" },
    { id: 3, action: "Mengunggah Foto Galeri", title: "Kegiatan Posyandu", date: "12 Juli 2026, 10:05", user: "Admin Utama" },
    { id: 4, action: "Menghapus Berita", title: "Pengumuman Jadwal Ronda (Lama)", date: "10 Juli 2026, 16:45", user: "Admin Utama" },
  ];

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
          <div className="admin-stat-value">24</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Berita</div>
          <div className="admin-stat-value">128</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Foto Galeri</div>
          <div className="admin-stat-value">56</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Admin</div>
          <div className="admin-stat-value">3</div>
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
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td style={{ fontWeight: 500 }}>{activity.action}</td>
                <td>{activity.title}</td>
                <td>{activity.date}</td>
                <td>{activity.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
