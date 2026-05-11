import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
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
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans text-slate-100" suppressHydrationWarning>
        <Script id="sanitize-external-dom-attrs" strategy="beforeInteractive">
          {`
            (function () {
              function clean(target) {
                if (!target || !target.getAttributeNames) return;
                target.getAttributeNames().forEach(function (name) {
                  if (name.indexOf('data-adreal-') === 0) {
                    target.removeAttribute(name);
                  }
                });
              }
              clean(document.documentElement);
              clean(document.body);
            })();
          `}
        </Script>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
