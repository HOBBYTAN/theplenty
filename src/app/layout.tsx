import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "PLENTY Convention | Premium Venue in Seoul",
    template: "%s | PLENTY Convention",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "PLENTY Convention",
    "서초 웨딩홀",
    "서울 컨벤션",
    "반포 연회장",
    "기업 행사 장소",
  ],
  openGraph: {
    title: "PLENTY Convention",
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: "PLENTY Convention",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLENTY Convention",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cormorant.variable}>{children}</body>
    </html>
  );
}
