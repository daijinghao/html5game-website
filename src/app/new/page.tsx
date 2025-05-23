import { newGames } from '@/data/games';
import { GameCard } from '@/components/GameCard';

// 设置页面为静态生成
export const dynamic = 'force-static';
export const revalidate = 3600; // 每小时重新生成一次

export default function NewGamesPage() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Games</h1>
        <p className="text-gray-600 mt-2">List of recently added games</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {newGames.map((game, index) => (
          <GameCard 
            key={game.id} 
            game={game}
            priority={index < 10} // 增加优先加载的数量
          />
        ))}
      </div>
    </div>
  );
} 