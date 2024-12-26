"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  id: string;
}

interface CardData {
  title: string;
  href: string;
  gradient: string;
}

interface CardProps {
  card: CardData;
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
}

interface FocusCardsProps {
  cards: CardData[];
}

const Card = ({ card, index, hovered, setHovered }: CardProps) => {
  const isHovered = hovered === index;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative overflow-hidden h-[300px] sm:h-60 md:h-[550px] w-full",
        "transition-all duration-500 ease-out mx-1 sm:mx-4 rounded-xl",
        "border border-gray-200",
        hovered !== null && !isHovered && "scale-95 opacity-60"
      )}
    >
      {/* Animated background */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          "bg-gradient-to-br",
          card.gradient,
          isHovered && "scale-110"
        )}
      />

      {/* Animated pattern overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-10",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)]",
          "bg-[length:24px_24px]",
          "transition-transform duration-700",
          isHovered && "scale-150 rotate-12"
        )}
      />

      {/* Content container */}
      <div className="relative h-full w-full flex items-center justify-center p-6">
        {/* Category title */}
        <Link
          href={card.href}
          className={cn(
            "text-xl sm:text-2xl md:text-3xl font-medium",
            "text-white text-center",
            "py-4 px-8",
            "backdrop-blur-sm rounded-xl",
            "transform transition-all duration-500",
            "border border-white/20",
            "hover:scale-105",
            "group",
            isHovered && "bg-black/20"
          )}
        >
          <span className="block transition-transform group-hover:-translate-y-1">
            {card.title}
          </span>
          {/* Animated underline */}
          <div
            className={cn(
              "h-px bg-white/50 mx-auto mt-2",
              "transition-all duration-500 ease-out",
              "w-0 group-hover:w-full"
            )}
          />
        </Link>
      </div>

      {/* Corner accents */}
      {isHovered && (
        <>
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/30 transition-all duration-300" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/30 transition-all duration-300" />
        </>
      )}
    </div>
  );
};

const MemoizedCard = React.memo(Card);

export function FocusCards({ cards }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full px-2 sm:px-8 md:px-10">
      {cards.map((card, index) => (
        <MemoizedCard
          key={`${card.title}-${index}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
