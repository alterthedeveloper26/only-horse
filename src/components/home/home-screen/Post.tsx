"use client";

import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { user } from "@/dummy_data";
import { cn } from "@/lib/utils";
import {
  Heart,
  ImageIcon,
  LockKeyholeIcon,
  MessageCircle,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

const Post = ({
  post,
  admin,
  isSubscribed,
}: {
  post: any;
  admin: any;
  isSubscribed: boolean;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col gap-3 border-t p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={admin.image || "/user-placeholder.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-sm font-semibold md:text-base">
              {admin.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs tracking-tighter text-zinc-400 md:text-sm">
            25.11.2025
          </p>
          {admin.id === user.id && (
            <Trash className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-red-500" />
          )}
        </div>
      </div>
      <p className="text-sm md:text-base">{post.text}</p>
      {(post.isPublic || isSubscribed) &&
        post.mediaUrl &&
        post.mediaType === "image" && (
          <div className="relative w-full overflow-hidden rounded-lg pb-[56%]">
            <Image
              src={post.mediaUrl}
              alt="post img"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        )}

      {/* {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === 'video' && ()} */}
      {!(post.isPublic || isSubscribed) && (
        <div className="bg-of relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-800 px-5">
          <LockKeyholeIcon className="z-0 mb-20 h-16 w-16 text-zinc-400" />
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-full bg-stone-800 opacity-60"
          />
          <div className="z-10 flex w-full flex-col gap-2 rounded border border-gray-500 p-2">
            <div className="flex items-center gap-1">
              <ImageIcon className="h-4 w-4" />
              <span className="text-xs">1</span>
            </div>
            <Link
              className={buttonVariants({
                className: "w-full !rounded-full font-bold text-white",
              })}
              href="/pricing"
            >
              Subscribe to unlock
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Heart
            className={cn("h-5 w-5 cursor-pointer", {
              "fill-red-500 text-red-500": liked,
            })}
            onClick={() => setLiked((liked) => !liked)}
          />
          <span className="text-xs tracking-tighter text-zinc-400">55</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="h-5 w-5 cursor-pointer" />
          <span className="text-xs tracking-tighter text-zinc-400">55</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
