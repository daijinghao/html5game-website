'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GameCategory } from '@/types/game';

interface CategoryCardProps {
  category: GameCategory;
  priority?: boolean;
}

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden">
        {/* 分类图标 */}
        <div className="absolute inset-0">
          <Image
            src={category.icon}
            alt={category.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        </div>

        {/* 分类名称 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold text-center px-4">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
} 