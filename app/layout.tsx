"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ModelProvider from "@/providers/ModelProvider";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const location = usePathname();

  const noLayoutRoutes = ["/admin", "/admin/*"];
  const shouldRenderLayout = !noLayoutRoutes.some((route) =>
    location.startsWith(route)
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ModelProvider />
        <div className="flex flex-col min-h-screen">
          <div className="bg-gray-200 z-20 ">
            {shouldRenderLayout && <Header />}
          </div>

          {children}
          <ProgressBar
            height="5px"
            color="#000000"
            options={{ showSpinner: false }}
            shallowRouting
          />
          {shouldRenderLayout && (
            <Footer
              socialLinks={{
                instagram: "https://instagram.com/yourpage",
                facebook: "https://facebook.com/yourpage",
                youtube: "https://youtube.com/yourpage",
                pinterest: "https://pinterest.com/yourpage",
              }}
            />
          )}
        </div>
      </body>
    </html>
  );
}
