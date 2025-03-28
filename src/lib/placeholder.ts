export function getPlaceholderImage(text: string, width: number, height: number, bgColor = '1a1a1a', textColor = 'ffffff'): string {
  // 使用 placehold.co 服务生成占位图片
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
}

export function getCategoryPlaceholder(name: string): string {
  return getPlaceholderImage(name, 400, 400);
}

export function getGamePlaceholder(name: string, size: 'small' | 'medium' | 'large'): string {
  const sizes = {
    small: { width: 200, height: 200 },
    medium: { width: 400, height: 600 },
    large: { width: 800, height: 400 }
  };
  const { width, height } = sizes[size];
  return getPlaceholderImage(name, width, height);
} 