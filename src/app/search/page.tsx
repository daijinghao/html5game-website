import { games } from '@/data/games';
import { GameCard } from '@/components/GameCard';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchTerm = searchParams.q?.toLowerCase() || '';
  
  const searchResults = games.filter(game => {
    const matchName = game.name.toLowerCase().includes(searchTerm);
    const matchDescription = game.description.toLowerCase().includes(searchTerm);
    const matchCategories = game.categories.some(cat => 
      cat.toLowerCase().includes(searchTerm)
    );
    return matchName || matchDescription || matchCategories;
  });

  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">
        {searchTerm ? (
          <>搜索 &quot;{searchParams.q}&quot; 的结果 ({searchResults.length})</>
        ) : (
          '请输入搜索关键词'
        )}
      </h1>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : searchTerm && (
        <div className="text-center text-gray-500 py-12">
          没有找到相关游戏
        </div>
      )}
    </div>
  );
} 