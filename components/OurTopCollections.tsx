import { AnimatedCollections } from "@/components/ui/animated-testimonials";

export function OurTopCollections() {
  const topCollections = [
    {
      title: "Pashmina Shawl",
      description:
        "Handwoven and embroidered with exquisite Kashmiri motifs, this shawl is a masterpiece of craftsmanship.",
      price: "₹15,000",
      src: "/images/i1.webp",
    },
    {
      title: "Aari Work Cushion Cover",
      description:
        "Elegant cushion covers with intricate Aari embroidery that add a touch of sophistication to your home.",
      price: "₹1,200",
      src: "/images/i2.webp",
    },
    {
      title: "Sozni Embroidered Saree",
      description:
        "A luxurious saree featuring fine Sozni embroidery, perfect for festive occasions.",
      price: "₹18,500",
      src: "/images/i3.webp",
    },
    {
      title: "Kashmiri Wool Stole",
      description:
        "Lightweight yet warm, this woolen stole is adorned with traditional Kashmiri embroidery.",
      price: "₹3,500",
      src: "/images/i4.webp",
    },
    {
      title: "Crewel Embroidered Wall Hanging",
      description:
        "A beautiful wall hanging that showcases the vibrant art of Kashmiri crewel embroidery.",
      price: "₹2,800",
      src: "/images/i5.webp",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-3 tracking-wide  uppercase leading-tight">
          Discover Our Exquisite Collections
        </h2>
        <p className="text-lg text-gray-600 dark:text-neutral-400 text-center mb-2 tracking-wide ">
          Immerse yourself in the timeless elegance and artistry of handcrafted
          Kashmiri products. From luxurious shawls to intricate home décor,
          explore the finest offerings that celebrate tradition and
          craftsmanship.
        </p>
        <AnimatedCollections collections={topCollections} />
      </div>
    </section>
  );
}
