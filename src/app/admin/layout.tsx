import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Dusun Jetis",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
