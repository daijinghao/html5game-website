import { Game, GameCategory } from '@/types/game';
import gamesData from './games.json';

// 分类图标映射
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

// 生成固定的热度值（基于游戏 ID）
function generateStaticPopularity(id: number): number {
  // 使用游戏 ID 作为种子生成 8-10 之间的固定值
  return 8 + (id % 1000) / 500; // 将 id 映射到 0-2 之间，然后加 8
}

// 预先排序的游戏列表
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
  popularity: generateStaticPopularity(game.id), // 使用基于 ID 的固定热度值
  createdAt: game.created_at
}));

// 缓存排序后的列表
const popularGamesCache = [...processedGames].sort((a, b) => b.popularity - a.popularity);
const newGamesCache = [...processedGames].sort((a, b) => 
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

// 导出缓存的列表
export const popularGames = popularGamesCache;
export const newGames = newGamesCache;
export const games = processedGames;

// 从游戏数据中提取所有唯一的分类
const uniqueCategories = Array.from(
  new Set(
    gamesData.flatMap(game => 
      game.category.split(', ').map(cat => cat.trim())
    )
  )
).sort();

// 创建分类数据
export const categories: GameCategory[] = uniqueCategories.map(name => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  icon: categoryIcons[name] || categoryIcons['Arcade'], // 如果没有找到对应图标，使用 Arcade 的图标作为默认值
  description: `${name}类游戏`
})); 