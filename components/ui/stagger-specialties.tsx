"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SQRT_5000 = Math.sqrt(5000);

export interface SpecialtyItem {
  tempId: number;
  title: string;
  description: string;
  imgSrc: string;
}

interface SpecialtyCardProps {
  position: number;
  item: SpecialtyItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ 
  position, 
  item, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out overflow-hidden rounded-2xl",
        isCenter 
          ? "z-10 border-white" 
          : "z-0 border-white/50 hover:border-white shadow-sm"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
        boxShadow: isCenter ? "0px 20px 40px -10px rgba(0, 0, 0, 0.4)" : "none"
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imgSrc}
          alt={item.title}
          fill
          className="object-cover"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
        <h3 className="text-xl font-bold mb-3 tracking-tight drop-shadow-lg">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/90 drop-shadow-md">
          {item.description}
        </p>
      </div>
    </div>
  );
};

interface StaggerSpecialtiesProps {
  specialties: SpecialtyItem[];
}

export const StaggerSpecialties: React.FC<StaggerSpecialtiesProps> = ({ specialties: initialSpecialties }) => {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(initialSpecialties);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 380 : 300);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 650 }}
    >
      {list.map((item, index) => {
        const position = list.length % 2 
          ? index - (list.length - 1) / 2 
          : index - list.length / 2;
        return (
          <SpecialtyCard
            key={item.tempId}
            item={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-4 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all shadow-lg",
            "bg-white border border-gray-200 text-primary-blue hover:bg-primary-blue hover:text-white hover:border-primary-blue",
            "focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
          )}
          aria-label="Previous specialty"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all shadow-lg",
            "bg-white border border-gray-200 text-primary-blue hover:bg-primary-blue hover:text-white hover:border-primary-blue",
            "focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
          )}
          aria-label="Next specialty"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
