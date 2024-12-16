"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import useCategories from "@/hooks/useCategories";

const CategorySection = () => {
  const {categories} = useCategories()
  console.log(categories)
  const cards = categories.map(category => ({
    title: category.name,
    src: "/shawls.jpg", // Using default image since we don't have category images
  }));

  return (
    <section className=" w-full m-12 flex justify-center flex-col items-center">
      <span className="font-semibold text-2xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
        SHOP BY CATEGORY
      </span>
      <FocusCards cards={cards} />
    </section>
  );
};
export default CategorySection;
