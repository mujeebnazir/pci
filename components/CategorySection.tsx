import { FocusCards } from "@/components/ui/focus-cards";

export function CategorySection() {
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
    <section className=" w-full m-12 flex justify-center flex-col items-center">
      <span className="font-semibold text-2xl md:text-4xl text-center mb-8 text-gray-800 uppercase">
        SHOP BY CATEGORY
      </span>
      <FocusCards cards={cards} />
    </section>
  );
}
