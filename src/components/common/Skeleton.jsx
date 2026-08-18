// Skeleton loading states
export const SkeletonLine = ({ className = "" }) => (
  <div className={`h-4 bg-slate-200 rounded animate-pulse ${className}`} />
);

export const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-slate-200 rounded-card animate-pulse ${className}`} />
);

// Course card skeleton
export const CourseSkeleton = () => (
  <div className="card p-6 space-y-4">
    <SkeletonBox className="h-10 w-10 rounded-xl" />
    <SkeletonLine className="w-1/3 h-3" />
    <SkeletonLine className="w-3/4" />
    <SkeletonLine className="w-full h-3" />
    <SkeletonLine className="w-2/3 h-3" />
    <div className="flex gap-2 pt-2">
      <SkeletonLine className="w-20 h-6 rounded-pill" />
      <SkeletonLine className="w-20 h-6 rounded-pill" />
    </div>
    <div className="flex items-center justify-between pt-2">
      <SkeletonLine className="w-24 h-8 rounded-btn" />
      <SkeletonLine className="w-16 h-4" />
    </div>
  </div>
);

// Blog card skeleton
export const BlogSkeleton = () => (
  <div className="card overflow-hidden">
    <SkeletonBox className="h-48 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <SkeletonLine className="w-1/4 h-3 rounded-pill" />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-full h-3" />
      <SkeletonLine className="w-2/3 h-3" />
      <div className="flex items-center gap-2 pt-1">
        <SkeletonBox className="w-6 h-6 rounded-full" />
        <SkeletonLine className="w-20 h-3" />
      </div>
    </div>
  </div>
);

// Trainer card skeleton
export const TrainerSkeleton = () => (
  <div className="card p-6 space-y-4 text-center">
    <SkeletonBox className="w-20 h-20 rounded-full mx-auto" />
    <div className="space-y-2">
      <SkeletonLine className="w-2/3 mx-auto" />
      <SkeletonLine className="w-1/2 mx-auto h-3" />
    </div>
    <div className="flex gap-2 justify-center">
      <SkeletonLine className="w-16 h-6 rounded-pill" />
      <SkeletonLine className="w-16 h-6 rounded-pill" />
    </div>
  </div>
);

// Batch row skeleton
export const BatchSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border-b border-border animate-pulse">
    <SkeletonLine className="w-1/4" />
    <SkeletonLine className="w-1/6" />
    <SkeletonLine className="w-16 h-3" />
    <SkeletonLine className="w-16 h-6 rounded-pill" />
    <SkeletonLine className="w-16 h-8 rounded-btn ml-auto" />
  </div>
);
