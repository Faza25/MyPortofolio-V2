import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zaast | Portofolio",
  description: "Portofolio mahasiswa informatika dan kumpulan proyek pilihan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="antialiased"><a href="#main-content" className="skip-link">Langsung ke konten</a>{children}</body>
    </html>
  );
}
