'use client';

import { games } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState(games);
  const searchTerm = searchParams.get('q')?.toLowerCase() || '';
  
  useEffect(() => {
    const results = games.filter(game => {
      const matchName = game.name.toLowerCase().includes(searchTerm);
      const matchDescription = game.description.toLowerCase().includes(searchTerm);
      const matchCategories = game.categories.some(cat => 
        cat.toLowerCase().includes(searchTerm)
      );
      return matchName || matchDescription || matchCategories;
    });
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">
        {searchTerm ? (
          <>Search results for &quot;{searchParams.get('q')}&quot; ({searchResults.length})</>
        ) : (
          'Please enter a search term'
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
          No games found
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center text-gray-500 py-12">
          Loading...
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
} 