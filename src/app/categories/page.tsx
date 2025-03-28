import { categories } from '@/data/games';
import { CategoryCard } from '@/components/CategoryCard';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">游戏分类</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category}
            priority={index < 5}
          />
        ))}
      </div>
    </div>
  );
} 