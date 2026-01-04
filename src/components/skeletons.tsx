import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function SearchInputSkeleton() {
  return (
    <div className="h-[60px] bg-[#121212] border border-[#2C2C2C] rounded-full flex items-center px-5">
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

export function RuleCardSkeleton() {
  return (
    <div className="bg-[#121212] border border-[#1C1C1C] rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function RuleListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <RuleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MCPCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#121212] border border-[#1C1C1C] rounded-full">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export function MCPListSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <MCPCardSkeleton key={i} />
      ))}
    </div>
  );
}
