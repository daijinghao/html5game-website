import { popularGames } from '@/data/games';
import { GameCard } from '@/components/GameCard';

// 设置页面为静态生成
export const dynamic = 'force-static';
export const revalidate = 3600; // 每小时重新生成一次

export default function PopularGamesPage() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">热门游戏</h1>
        <p className="text-gray-600 mt-2">最受欢迎的游戏列表</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {popularGames.map((game, index) => (
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