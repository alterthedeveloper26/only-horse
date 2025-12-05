import { countLike } from "@/db/like.repository";
import { countMedia } from "@/db/post.repository";
import { formatLikes } from "@/lib/utils";
import { Heart, Image as LucidImage, Video } from "lucide-react";
import Image from "next/image";
import React from "react";

const CoverImage = async ({ adminName }: { adminName: string }) => {
  const imageCount = await countMedia("image");
  const videoCount = await countMedia("video");
  const likeCount = await countLike();

  return (
    <div className="relative h-44 overflow-hidden">
      <Image
        src={"/featured/featured10.jpg"}
        alt="cover image"
        className="pointer-events-none h-full w-full select-none object-cover"
        fill
      />
      <div
        className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-slate-800 to-transparent"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-white">
            <p className="font-bold">{adminName}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <LucidImage className="h-4 w-4" />
                <span className="text-sm font-bold">{imageCount}</span>
              </div>

              <span className="text-xs">•</span>

              <div className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span className="text-sm font-bold">{videoCount}</span>
              </div>
              <span className="text-xs">•</span>

              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-bold">
                  {formatLikes(likeCount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
