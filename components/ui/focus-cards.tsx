import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        " relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-[550px] w-full transition-all duration-300 ease-out mx-4",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      {/* Background overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Title as a centered button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Link
          href="/category/Women"
          className={cn(
            "text-base sm:text-lg md:text-xl font-light text-gray-800 bg-white py-1 sm:py-2 px-4 sm:px-6  transform transition duration-300 ease-in-out",
            hovered === index && "scale-105"
          )}
        >
          {card.title}
        </Link>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mx-auto sm:px-4 md:px-8">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
