import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rex-Archives | ADAMIC",
  description:
    "Rex-Archives préserve les souvenirs média avec une synthèse narrative IA, des fresques immersives et des parcours d'archivage fiables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-slate-100">{children}</body>
    </html>
  );
}
