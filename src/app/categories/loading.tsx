import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="h-8 w-48 bg-gray-200 rounded-md mb-8 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse">
            <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 