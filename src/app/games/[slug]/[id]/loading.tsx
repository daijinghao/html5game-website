export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* 标题和分类的加载状态 */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* 游戏内容区域的加载状态 */}
        <div className="bg-gray-200 rounded-lg overflow-hidden mb-8 animate-pulse">
          <div className="w-full aspect-video"></div>
        </div>

        {/* 游戏描述的加载状态 */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 