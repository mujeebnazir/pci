"use client";
import dynamic from "next/dynamic";
const Showcase = dynamic(() => import("@/components/Showcase"), { ssr: false });
const Products = dynamic(() => import("@/components/Products"), { ssr: false });
const GiftsSection = dynamic(() => import("@/components/GiftSection"), {
  ssr: false,
});
const HeroContent = dynamic(() => import("@/components/HeroContent"), {
  ssr: true,
});
const CategorySection = dynamic(() => import("@/components/CategorySection"), {
  ssr: false,
});
const WhyPCIBanner = dynamic(() => import("@/components/Banner"), {
  ssr: false,
});
import { OurTopCollections } from "@/components/OurTopCollections";
import { useCartStore } from "@/zustand/cart";
import { useEffect, useMemo } from "react";
import useAuthStore from "@/zustand/authStore";
import { useFetchNewlyAddedProducts } from "@/hooks/useNewlyAddedProducts";
import useProducts from "@/hooks/useProducts";
import Loading from "@/components/Loading";
import LogoCarousel from "@/components/LogoCarousel";
import KashmirEmbroidery from "@/components/KashmirEmbriodery";

export default function Home() {
  const { newProducts, loading } = useFetchNewlyAddedProducts();
  const { products, loadingProducts } = useProducts();
  const store = useCartStore((state) => state);
  const auth = useAuthStore((state) => state);

  const isLoading = loading || loadingProducts;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await auth.checkUserStatus();
        await store.initializeCart();
      } catch (err: any) {
        throw new Error("Error initializing cart", err);
      }
    };

    fetchCart();
  }, []);

  const images = useMemo(
    () => [
      { src: "/images/i1.webp", alt: "Product 1" },
      { src: "/images/i2.webp", alt: "Product 2" },
      { src: "/images/i3.webp", alt: "Product 3" },
      { src: "/images/i4.webp", alt: "Product 4" },
    ],
    []
  );

  return (
    <div className="flex flex-col h-full items-center justify-center rounded-md bg-white">
      {/* Hero Section: Main banner and call-to-action */}
      <section className="w-full">
        <HeroContent />
      </section>

      {/* Logo Carousel: Displays partner or brand logos */}
      <LogoCarousel />

      {/* New Arrivals Section: Latest products */}
      <section className="flex flex-col justify-center items-center pt-12 w-full">
        <h2 className="font-semibold text-2xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
          New Arrivals
        </h2>
        <div className="py-4 w-full">
          {isLoading ? <Loading /> : <Products products={newProducts as any} />}
        </div>
      </section>

      {/* Category Section: Product navigation by categories */}
      <CategorySection />

      {/* Best Sellers Section: Popular products */}
      <section id="bestSellers" className="flex flex-col justify-center items-center pt-12 w-full bg-white">
        <h2 className="font-semibold text-3xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
          Best Sellers
        </h2>
        <div className="py-4 w-full">
          {isLoading ? <Loading /> : <Products products={products} />}
        </div>
      </section>

      {/* Special Offers & Gifts Section */}
      <GiftsSection />
       
       <OurTopCollections/>
      {/* Kashmir Embroidery Section: Custom content */}
      <KashmirEmbroidery />

      {/* Trust Indicators Section: Why choose us */}
      {/* <WhyPCIBanner /> */}

      {/* Showcase Section: Visual product gallery */}
      <section  className=" flex flex-col justify-center items-center w-full m-10">
        <div className="min-h-screen flex items-center justify-center">
          <Showcase images={images} />
        </div>
      </section>
    </div>
  );
}
