import { games, categories } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CategoryPage({ params }: Props) {
  // Find category information
  const category = categories.find(cat => cat.id === params.id);
  
  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }

  // Filter all games in this category
  const categoryGames = games.filter(game =>
    game.categories.includes(category.name)
  );

  return (
    <div className="container mx-auto px-4 pt-20">
      {/* Category Title and Description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">{categoryGames.length} games</p>
      </div>

      {/* Game List */}
      {categoryGames.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryGames.map((game, index) => (
            <GameCard 
              key={game.id} 
              game={game}
              priority={index < 5} // Only add priority to first 5 games
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          No games in this category
        </div>
      )}
    </div>
  );
}

// Generate all possible category paths
export function generateStaticParams() {
  return categories.map(category => ({
    id: category.id,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find(cat => cat.id === params.id);
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  return {
    title: `${category.name} - HTML5 Games`,
    description: category.description,
  };
} 