"use client";
import dynamic from "next/dynamic";
const Showcase = dynamic(() => import("@/components/Showcase"), { ssr: false });
const Products = dynamic(() => import("@/components/Products"), { ssr: false });
const GiftsSection = dynamic(() => import("@/components/GiftSection"), {
  ssr: false,
});
const HeroContent = dynamic(() => import("@/components/HeroContent"), {
  ssr: false,
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

export default function Home() {
  const { newProducts, loading } = useFetchNewlyAddedProducts();
  const { products, loadingProducts } = useProducts();
  const store = useCartStore((state) => state);
  const auth = useAuthStore((state) => state);

  const isLoading = loading || loadingProducts;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const session = await auth.checkUserStatus();
        await store.initializeCart();
      } catch (err: any) {
        console.error("Error initializing cart:", err);
        throw new Error("Error initializing cart");
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
      {/* Hero Section */}
      <section className="w-full">
        <HeroContent />
      </section>

      {/* {carousel} */}
      <LogoCarousel />
      {/* Gift Section */}
      <GiftsSection />
      {/* New Arrivals Section */}
      <section className="flex flex-col justify-center items-center pt-12 w-full ">
        <span className="font-semibold text-2xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
          New Arrivals
        </span>
        <div className="py-4 w-full">
          {isLoading ? (
            <Loading/>
          ) : (
            <Products products={newProducts as any} />
          )}
        </div>
      </section>
      {/*category section */}
      <CategorySection />
      {/* Best Sellers Section */}
      <section className="flex flex-col justify-center items-center pt-12 w-full bg-white">
        <span className="font-semibold text-3xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
          Best Sellers
        </span>
        <div className="py-4 w-full">
          {isLoading ? (
            <Loading/>
          ) : (
            <Products products={products} />
          )}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="flex flex-col justify-center items-center  w-full m-10">
        <div className="min-h-screen flex items-center justify-center">
          <Showcase images={images} />
        </div>
      </section>
    </div>
  );
}
