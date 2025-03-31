import Image from "next/image";
import { GameCarousel } from "@/components/GameCarousel";
import { GameCard } from "@/components/GameCard";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, games } from "@/data/games";

export default function Home() {
  // Sort by popularity, take top 5 as featured games
  const featuredGames = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  
  // Sort by creation time, show latest games
  const latestGames = [...games].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold sm:inline-block">
                HTML5 Games
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Search games..."
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto pt-20 px-4">
        {/* Popular Games Carousel */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Games</h2>
          <GameCarousel games={featuredGames} />
        </section>

        {/* Game Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Game Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* New Games */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">New Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {latestGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          © 2024 HTML5 Games. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
