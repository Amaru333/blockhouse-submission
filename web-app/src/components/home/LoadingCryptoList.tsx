import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingCryptoList() {
  return (
    <div>
      <div className="items-center space-x-4 my-1.5 grid grid-cols-11 gap-4 dark:bg-slate-800/50 bg-slate-100/50 p-2 rounded-lg">
        <div className="flex items-center gap-x-4 col-span-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="w-16 h-4 rounded-full mb-2" />
            <Skeleton className="w-8 h-3 rounded-full" />
          </div>
        </div>
        <div className="col-span-2">
          <Skeleton className="w-16 h-4 rounded-full mb-2" />
          <Skeleton className="w-12 h-3 rounded-full" />
        </div>
        <div className="col-span-3">
          <Skeleton className="w-28 h-4 rounded-full" />
        </div>
        <div className="col-span-3">
          <Skeleton className="w-28 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default LoadingCryptoList;
