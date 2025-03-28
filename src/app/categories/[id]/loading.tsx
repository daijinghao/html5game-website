export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-20">
      {/* 标题和描述的加载状态 */}
      <div className="mb-8 space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 w-full max-w-2xl bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* 游戏卡片的加载状态 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse">
            <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 