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
        "relative overflow-hidden h-[300px] sm:h-60 md:h-[550px] w-full transition-all duration-300 ease-out mx-1 sm:mx-4 rounded-lg",
        hovered !== null && hovered !== index && "scale-97"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover absolute inset-0 rounded-lg hover:shadow"
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
            "text-sm sm:text-base md:text-xl font-light text-gray-800 bg-white py-1 sm:py-2 px-3 sm:px-6 transform transition duration-300 ease-in-out",
            hovered === index && "scale-105 shadow"
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 w-full px-2 sm:px-8 md:px-10">
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
