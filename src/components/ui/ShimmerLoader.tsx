export const ShimmerLoader = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded-md bg-[length:200%_100%] animate-shimmer"></div>
    </div>
  );
};

export const ShimmerCard = () => {
  return (
    <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-1/2"></div>
        <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-2/3"></div>
      </div>
    </div>
  );
};