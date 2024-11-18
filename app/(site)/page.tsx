"use client";
import Showcase from "@/components/Showcase";
import { Categories } from "@/components/Categories";
import HeroContent from "@/components/HeroContent";
import Products from "@/components/Products";
import { products, features } from "@/constants";
export default function Home() {
  const images = [
    { src: "/images/i1.webp", alt: "Product 1" },
    { src: "/images/i2.webp", alt: "Product 2" },
    { src: "/images/i3.webp", alt: "Product 3" },
    { src: "/images/i4.webp", alt: "Product 4" },
  ];
  return (
    <div
      className="flex flex-col h-full items-center justify-center rounded-md 
    "
    >
      <section className="flex flex-col w-full bg-blue-500 mt-10">
        <div>
          <HeroContent />
        </div>
        <div className="flex text-sm flex-row  w-full items-center justify-between mx-auto font-normal bg-black  text-gray-300 py-2">
          {features.map((item, index) => (
            <div
              key={index}
              className="mx-auto flex flex-col items-center justify-center"
            >
              <div>{item.icon}</div>
              <div className=" italic font-sans">{item.title}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center pt-12  w-full">
        <span className="font-semibold font-sans uppercase text-3xl">
          New Arrivals
        </span>
        <div className="py-4 ">
          <Products products={products} />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center pt-12  w-full">
        <span className="font-semibold font-sans uppercase text-3xl">
          Best Sellers
        </span>
        <div className="py-4 ">
          <Products products={products} />
        </div>
      </section>
      {/* <section className="flex flex-col justify-center items-center p-4 bg-gray-200 w-full">
        <span className="font-semibold font-sans uppercase text-3xl">
          Shop by Category
        </span>
        <div className="py-2 w-full  mx-auto">
          <Categories />
        </div>
      </section> */}
      <section className="flex flex-col justify-center items-center pt-12  w-full">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Showcase images={images} />
        </div>
      </section>
    </div>
  );
}
