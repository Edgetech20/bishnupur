import type { Metadata } from "next";
import { Geist, Galada } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const galada = Galada({ variable: "--font-galada", subsets: ["bengali"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://utsav.databind.in"),
  title: "বোধি-উৎসর্জ্জী",
  description:
    "You are cordially invited to বোধি-উৎসর্জ্জী on 20 December 2026 at Bishnupur, West Bengal.",
  openGraph: {
    title: "বোধি-উৎসর্জ্জী বিষ্ণুপুর মহকুমা উৎসব | 20 December 2026",
    description: "You are cordially invited — Bishnupur, West Bengal 722122.",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "বোধি-উৎসর্জ্জী বিষ্ণুপুর মহকুমা উৎসব",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "বোধি-উৎসর্জ্জী বিষ্ণুপুর মহকুমা উৎসব | 20 December 2026",
    description: "You are cordially invited — Bishnupur, West Bengal.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${galada.variable}`}>
      <body className="antialiased">
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
          }
        ` }} />
      </body>
    </html>
  );
}
