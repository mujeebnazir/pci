import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ModelProvider from "@/providers/ModelProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default :"Phalgham Cottage Industries - Shop Authentic Kashmiri Products",
    template: "%s | Phalgham Cottage Industries",
  },
  description:
    "Discover authentic Kashmiri products including Pashmina shawls, suits, and traditional handicrafts. Each piece tells a story of heritage and craftsmanship.",
  keywords: [
    "Phalgham Cottage Industries",
    "Phalgham",
    "Phalgham Cottage",
    "Kashmiri shawls",
    "Pashmina shawls",
    "Kashmiri suits",
    "Kashmir handicrafts",
    "traditional Kashmiri art",
    "authentic Pashmina",
    "handmade Kashmiri products",
    "buy Kashmiri shawls online",
    "Kashmiri embroidery",
    "handmade Kashmiri products",
    "pure Pashmina",
    "Kashmir wool products",
    "traditional Kashmiri clothing",
    "Kashmiri fashion",
    "artisan crafts Kashmir",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Pashmina Craft India - Authentic Kashmiri Craftsmanship",
    description:
      "Shop premium Kashmiri products including Pashmina shawls, suits and traditional handicrafts. Experience authentic craftsmanship.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/seoimage.png`,
        width: 1200,
        height: 630,
        alt: "Pashmina Craft India Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pashmina Craft India - Authentic Kashmiri Craftsmanship",
    description:
      "Shop premium Kashmiri products including Pashmina shawls, suits and traditional handicrafts.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/seoimage.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ModelProvider />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
