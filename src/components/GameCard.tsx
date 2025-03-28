'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

export function GameCard({ game, priority = false }: GameCardProps) {
  // 从 URL 中提取游戏名称和 UUID，添加错误处理
  let gameSlug = '';
  let gameId = '';
  
  try {
    const urlParts = game.url?.split('/') || [];
    gameSlug = urlParts[urlParts.length - 2] || game.id;
    gameId = urlParts[urlParts.length - 1] || game.id;
  } catch (error) {
    console.error('Error parsing game URL:', error);
    gameSlug = game.id;
    gameId = game.id;
  }

  return (
    <Link href={`/games/${gameSlug}/${gameId}`}>
      <div className="group relative bg-muted rounded-lg overflow-hidden transition-transform hover:scale-105">
        {/* 游戏图片 */}
        <div className="aspect-square relative">
          <Image
            src={game.icons.large}
            alt={game.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-contain bg-gray-100"
          />
        </div>

        {/* 游戏信息 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
          <h3 className="text-white font-semibold mb-1 line-clamp-1">{game.name}</h3>
          <div className="flex gap-2 flex-wrap">
            {game.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="text-xs px-2 py-1 bg-white/20 rounded-full text-white/90"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* 热度指标 */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          热度: {game.popularity}
        </div>
      </div>
    </Link>
  );
} 