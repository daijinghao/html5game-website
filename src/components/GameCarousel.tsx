'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCarouselProps {
  games: Game[];
}

export function GameCarousel({ games }: GameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % games.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [games.length]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
      {/* 轮播图片 */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <Image
              src={game.icons.large}
              alt={game.name}
              fill
              className="object-cover"
              priority={true}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{game.name}</h3>
              <p className="text-white/80 line-clamp-2">{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={() => setCurrentIndex((current) => (current - 1 + games.length) % games.length)}
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={() => setCurrentIndex((current) => (current + 1) % games.length)}
      >
        →
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {games.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
} 