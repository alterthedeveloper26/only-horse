import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="w-3/4 max-w-48">
      <div className="flex w-full flex-col items-center space-y-3">
        <div className="flex w-full justify-between gap-2">
          <Skeleton className="h-4 w-[90px]" />
          <Skeleton className="h-4 w-[90px]" />
        </div>
        <Skeleton className="h-[250px] w-full rounded-xl" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
