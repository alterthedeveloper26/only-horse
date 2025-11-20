import { cn } from "@/lib/utils";
import React from "react";

const RotatedText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className="relative whitespace-nowrap">
      <span
        className={cn(
          "absolute bg-sky-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1 mx-2",
          className
        )}
        aria-hidden="true"
      />
      <span className="relative uppercase">{children}</span>
    </span>
  );
};

export default RotatedText;
