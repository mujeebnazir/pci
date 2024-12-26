"use client"

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where layout should not render
  const noLayoutRoutes = ["/admin", "/admin/*"];
  const shouldRenderLayout = !noLayoutRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
     <ProgressBar
          height="5px"
          color="#000000"
          options={{ showSpinner: false }}
          shallowRouting
        />
      {shouldRenderLayout && <Header />}
      {children}
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
    </>
  );
}
