import { Game, GameCategory } from '@/types/game';
import gamesData from './games.json';

// Category icon mapping
const categoryIcons: Record<string, string> = {
  'Action': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/BubbleWoodsTeaser.jpg',
  'Arcade': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/TowerCrash3dTeaser.jpg',
  'Best': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/MiniPuttHolidayTeaser.jpg',
  'Breakout': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/SnowSmasherTeaser.jpg',
  'Bubble Shooter': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/BubbleWoodsTeaser.jpg',
  'Cards': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/GinRummyClassicTeaser.jpg',
  'Cars': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/2CarsTeaser.jpg',
  'Cooking and Baking': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/BurgerMakerTeaser.jpg',
  'Dress-up': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/TrisFashionistaDollyTeaser.jpg',
  'Educational': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/GeoQuizEuropeTeaser.jpg',
  'Girls': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/FashionYoTeaser.jpg',
  'Jump & Run': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/GiantRushTeaser.jpg',
  'Make-up': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/FashionYoTeaser.jpg',
  'Mahjong': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/MahjongManiaTeaser.jpg',
  'Match 3': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/JewelExplodeTeaser.jpg',
  'Puzzle': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/PairUp3dTeaser.jpg',
  'Quiz': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/GeoQuizEuropeTeaser.jpg',
  'Racing': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/RacingCarsTeaser.jpg',
  'Skill': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/Element_BallsTeaser.jpg',
  'Sport': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/HomeRunChampionTeaser.jpg',
  'Strategy': 'https://img.cdn.famobi.com/portal/html5games/images/tmp/180/ChessClassicTeaser.jpg'
};

// Generate fixed popularity values (based on game ID)
// Use game ID to generate fixed values between 8-10
function generateStaticPopularity(id: number): number {
  // Use game ID as seed to generate fixed values between 8-10
  return 8 + (id % 1000) / 500; // Map id to 0-2 range, then add 8
}

// Pre-sorted game list
const processedGames = gamesData.map(game => ({
  id: game.id.toString(),
  name: game.name,
  url: game.url,
  description: game.description,
  categories: game.category.split(', ').map(cat => cat.trim()),
  iframeUrl: game.embed_url,
  icons: {
    small: game.icons.small.split('?')[0],
    medium: game.icons.medium.split('?')[0],
    large: game.icons.large.split('?')[0]
  },
  popularity: generateStaticPopularity(game.id), // Use ID-based fixed popularity value
  createdAt: game.created_at
}));

// Cache sorted lists
const popularGamesCache = [...processedGames].sort((a, b) => b.popularity - a.popularity);
const newGamesCache = [...processedGames].sort((a, b) => 
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

// Export cached lists
export const popularGames = popularGamesCache;
export const newGames = newGamesCache;
export const games = processedGames;

// Get all unique categories from game data
const uniqueCategories = Array.from(
  new Set(
    gamesData.flatMap(game => 
      game.category.split(', ').map(cat => cat.trim())
    )
  )
).sort();

// Create category data
export const categories: GameCategory[] = uniqueCategories.map(name => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  icon: categoryIcons[name] || categoryIcons['Arcade'], // Use Arcade icon as default if no matching icon found
  description: `${name} Game`
})); 