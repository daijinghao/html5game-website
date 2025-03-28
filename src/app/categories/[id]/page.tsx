import { games, categories } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // 查找分类信息
  const category = categories.find(cat => cat.id === params.id);
  
  // 如果分类不存在，返回 404
  if (!category) {
    notFound();
  }

  // 过滤该分类下的所有游戏
  const categoryGames = games.filter(game =>
    game.categories.includes(category.name)
  );

  return (
    <div className="container mx-auto px-4 pt-20">
      {/* 分类标题和描述 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">共 {categoryGames.length} 个游戏</p>
      </div>

      {/* 游戏列表 */}
      {categoryGames.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryGames.map((game, index) => (
            <GameCard 
              key={game.id} 
              game={game}
              priority={index < 5} // 只给前5个游戏添加 priority
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          该分类下暂无游戏
        </div>
      )}
    </div>
  );
}

// 生成所有可能的分类路径
export function generateStaticParams() {
  return categories.map(category => ({
    id: category.id,
  }));
} 