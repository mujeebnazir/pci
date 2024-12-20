"use client";
import { AnimatedCollections } from "@/components/ui/animated-testimonials";
import { useFetchNewlyAddedProducts } from "@/hooks/useNewlyAddedProducts";

export function OurTopCollections() {
  const { newProducts } = useFetchNewlyAddedProducts();

  const topCollections = newProducts?.slice(0, 5).map((product) => ({
    title: product?.name,
    description: product?.description,
    price: `₹${(product?.price / 100).toLocaleString()}`,
    src: product?.images?.[0] || "/images/default-image.webp",
    href: `/product/${product?.id}`,
  }));

  return (
    <section className="py-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-xl md:text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-3 tracking-wide uppercase leading-tight">
          Discover Our Exquisite Collections
        </h2>
        <p className="text-lg text-gray-600 dark:text-neutral-400 text-center mb-1 tracking-wide">
          Immerse yourself in the timeless elegance and artistry of handcrafted
          Kashmiri products. From luxurious shawls to intricate home décor.
        </p>
        {/* Pass the sliced and mapped data to AnimatedCollections */}
        <AnimatedCollections collections={topCollections || []} />
      </div>
    </section>
  );
}
