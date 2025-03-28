'use client';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px]">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
} 