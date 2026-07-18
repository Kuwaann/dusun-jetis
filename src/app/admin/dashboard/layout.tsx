import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-dashboard-wrapper">
      <AdminSidebar />
      <div className="admin-main-wrapper">
        <AdminTopbar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
