"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const ZoomedImage = ({
  className,
  imgSrc,
}: {
  className?: string;
  imgSrc: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={cn("relative h-96 w-full overflow-hidden", className)}
      onMouseMove={handleMouseMovement}
    >
      <Image
        src={imgSrc}
        alt="Product image"
        fill
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
        className="transform cursor-pointer rounded-md transition-transform duration-500 ease-in-out hover:scale-[2.5]"
      />
    </div>
  );
};

export default ZoomedImage;
