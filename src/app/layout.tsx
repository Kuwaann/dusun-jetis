import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Dusun Jetis — Profil Wilayah",
  description: "Website profil Dusun Jetis, Desa Jamuskauman, Kecamatan Ngluwar, Kabupaten Magelang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${montserrat.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}

