import { games } from '@/data/games';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface GamePageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  // Find game information, add error handling
  const game = games.find(g => {
    try {
      const urlParts = g.url?.split('/') || [];
      const gameSlug = urlParts[urlParts.length - 2] || g.id;
      const gameId = urlParts[urlParts.length - 1] || g.id;
      return gameSlug === params.slug && gameId === params.id;
    } catch (error) {
      console.error('Error parsing game URL:', error);
      return g.id === params.id;
    }
  });

  // If game doesn't exist, return 404
  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Game Title and Categories */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
          <div className="flex gap-2 flex-wrap">
            {game.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-black rounded-lg overflow-hidden mb-8">
          <iframe
            src={game.iframeUrl}
            className="w-full aspect-video"
            allowFullScreen
          ></iframe>
        </div>

        {/* Game Description */}
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Game Description</h2>
          <p className="text-gray-600">{game.description}</p>
        </div>
      </div>
    </div>
  );
}

// Generate all possible game paths
export function generateStaticParams() {
  return games.map(game => {
    try {
      const urlParts = game.url?.split('/') || [];
      return {
        slug: urlParts[urlParts.length - 2] || game.id,
        id: urlParts[urlParts.length - 1] || game.id,
      };
    } catch (error) {
      console.error('Error parsing game URL:', error);
      return {
        slug: game.id,
        id: game.id,
      };
    }
  });
} 