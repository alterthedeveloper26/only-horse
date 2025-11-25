import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-3">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-[250px] w-full rounded-xl" />
      </div>
    </div>
  );
};

export default PostSkeleton;
