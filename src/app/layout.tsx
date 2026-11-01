import type { Metadata } from "next";
import { Geist, Galada } from "next/font/google";
import { db } from "@/lib/db";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const galada = Galada({ variable: "--font-galada", subsets: ["bengali"], weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const rows = await db.setting.findMany({ where: { key: { in: ["event_title", "event_title_sub", "event_date", "event_subtitle"] } } });
  const s = Object.fromEntries(rows.map(r => [r.key, r.value]));
  const title = s.event_title || "প্ৰিয়বোধী";
  const titleSub = s.event_title_sub || "মহোৎসব";
  const full = `${title} ${titleSub}`;
  const date = s.event_date || "20 December 2026";
  const subtitle = s.event_subtitle || "";
  const base = process.env.BASE_URL || "https://utsav.databind.in";
  return {
    metadataBase: new URL(base),
    title,
    description: `You are cordially invited to ${full} on ${date}${subtitle ? ` — ${subtitle}` : ""}.`,
    openGraph: {
      title: `${full} | ${date}`,
      description: `You are cordially invited${subtitle ? ` — ${subtitle}` : ""}.`,
      type: "website",
      images: [{ url: "/api/og", width: 1200, height: 630, alt: full }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${full} | ${date}`,
      description: `You are cordially invited${subtitle ? ` — ${subtitle}` : ""}.`,
      images: ["/api/og"],
    },
  };
}

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
