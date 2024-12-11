import { FocusCards } from "@/components/ui/focus-cards";

const  CategorySection =()=> {
  const cards = [
    {
      title: "Shawls",
      src: "/shawls.jpg",
    },
    {
      title: "Pashmina",
      src: "/pash.jpg",
    },
    {
      title: "Kalamkari",
      src: "/kalam.jpg",
    },
    {
      title: "Robes",
      src: "/pash.jpg",
    },
    {
      title: "Kurtes",
      src: "/pash.jpg",
    },
    {
      title: "Kaftans",
      src: "/pash.jpg",
    },
  ];

  return (
    <>
      <h2 className="text-4xl mt-5 sm:text-5xl font-semibold text-center text-gray-900 mb-12 leading-tight tracking-wide">
        Shop by Category
      </h2>
      <FocusCards cards={cards} />
    </>
  );
}
export default CategorySection;
