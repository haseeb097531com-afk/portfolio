import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader as DefaultPreloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/cinematic/SmoothScrollProvider";
import { Preloader as CinematicPreloader } from "@/components/cinematic/Preloader";
import { CustomCursor } from "@/components/cinematic/CustomCursor";
import { HudReadout } from "@/components/cinematic/HudReadout";
import { HoldToScroll } from "@/components/cinematic/HoldToScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Hafiz Muhammad Haseeb — Portfolio",
    template: "%s — Hafiz Muhammad Haseeb",
  },
  description: "Teacher by calling, builder by craft. I help hearts memorize, and hands create.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Hafiz Muhammad Haseeb — Portfolio",
    description: "Teacher by calling, builder by craft.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Muhammad Haseeb — Portfolio",
    description: "Teacher by calling, builder by craft.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {siteData.cinematic.enabled ? (
          <SmoothScrollProvider>
            {siteData.cinematic.preloader ? <CinematicPreloader /> : <DefaultPreloader />}
            {siteData.cinematic.customCursor && <CustomCursor />}
            {siteData.cinematic.hudReadouts && <HudReadout />}
            {siteData.cinematic.holdToFastForward && <HoldToScroll />}
            
            <Navbar />
            {children}
          </SmoothScrollProvider>
        ) : (
          <SmoothScroll>
            <DefaultPreloader />
            <Navbar />
            {children}
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
