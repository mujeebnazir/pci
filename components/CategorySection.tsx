"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import useCategories from "@/hooks/useCategories";

const CategorySection = () => {
  const { categories } = useCategories();

  // Monochromatic gradients
  const gradients = [
    "from-gray-900 to-gray-700",
    "from-black to-gray-800",
    "from-gray-800 to-gray-600",
    "from-gray-900 to-black",
    "from-gray-700 to-gray-500",
    "from-black to-gray-700",
  ];

  const cards = categories.map((category, index) => ({
    title: category.name,
    href: `/category/${category.name}`,
    gradient: gradients[index % gradients.length],
  }));

  return (
    <section className="w-full my-12 px-4">
      <h2 className="font-semibold text-2xl md:text-4xl text-center mb-12 text-gray-800 uppercase tracking-wider">
        Shop by Category
      </h2>
      <FocusCards cards={cards} />
    </section>
  );
};

export default CategorySection;
