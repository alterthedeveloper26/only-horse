"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { User } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { PostWithComments } from "@/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  Heart,
  ImageIcon,
  Loader,
  LockKeyholeIcon,
  MessageCircle,
  Trash,
  TriangleRightIcon,
  VideoIcon,
} from "lucide-react";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";
import { commentAction, deletePostAction, toggleLikeAction } from "./action";
import { toast } from "@/lib/toast";
import { queryClient } from "@/providers/ReactQueryProvider";
import { KEYS } from "@/constants";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import Alert from "@/components/Alert";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Comment from "./Comment";

const AnimatedHeart = motion(Heart);

const Post = ({
  post,
  admin,
  isSubscribed,
}: {
  post: PostWithComments;
  admin: User;
  isSubscribed: boolean;
}) => {
  const [postState, setPostState] = useState({
    liked: post.likesList.length > 0,
    likes: post.likes,
  });
  const { user } = useKindeBrowserClient();
  const [comment, setComment] = useState<string>("");

  const { mutate: deletePost, isPending } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => deletePostAction(post.id),
    onSuccess: () => {
      toast.success("Delete post successfully!");
      queryClient.invalidateQueries({
        queryKey: [KEYS.FETCH_POSTS],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const { mutate: toggleLike } = useMutation({
    mutationKey: ["like"],
    mutationFn: async () => toggleLikeAction(post.id),
    onMutate: () => {
      const prevState = { ...postState };
      setPostState((state) => ({
        likes: state.liked ? Math.max(state.likes - 1, 0) : state.likes + 1,
        liked: !state.liked,
      }));
      return { likedStorage: prevState };
    },
    onError: (err, data, context) => {
      toast.error("You can not like this post!");
      console.log("__________: ", err);
      setPostState(context!.likedStorage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.FETCH_POSTS],
      });
    },
  });

  const { mutate: createComment, isPending: isCommenting } = useMutation({
    mutationFn: async () => commentAction({ postId: post.id, text: comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.FETCH_POSTS],
      });
      setComment("");
    },
    onError: (e) => {
      console.log("______________: ", e);
      toast.error("Something wrong happened in our server!");
    },
  });

  const handleCommentSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return toast.error("You must provide comment message!");
    createComment();
  };

  return (
    <>
      {isPending && (
        <div className="mt-10 flex flex-col gap-10 px-3">
          <PostSkeleton />
        </div>
      )}
      {!isPending && (
        <div className="flex flex-col gap-3 border-t p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={admin.image || "/user-placeholder.png"}
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-sm font-semibold md:text-base">
                  {admin.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tighter text-zinc-400 md:text-sm">
                25.11.2025
              </p>
              {/* // TODO: fix here */}
              {admin.id === user?.id && (
                <Alert confirmAction={() => deletePost()}>
                  <Trash className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-red-500" />
                </Alert>
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

          {(post.isPublic || isSubscribed) &&
            post.mediaUrl &&
            post.mediaType === "video" && (
              <div className="mx-auto w-full">
                <CldVideoPlayer
                  width={960}
                  height={540}
                  className="rounded-md"
                  src={post.mediaUrl}
                />
              </div>
            )}

          {!(post.isPublic || isSubscribed) && (
            <div className="bg-of relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-800 px-5">
              <LockKeyholeIcon className="z-0 mb-20 h-16 w-16 text-zinc-400" />
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-full bg-stone-800 opacity-60"
              />
              <div className="z-10 flex w-full flex-col gap-2 rounded border border-gray-500 p-2">
                <div className="flex items-center gap-1">
                  {post.mediaType === "image" ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <VideoIcon className="h-4 w-4" />
                  )}
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
              <AnimatedHeart
                animate={{
                  fill: postState.liked ? "#ef4444" : "transparent",
                }}
                whileHover={{ scale: 1.1 }}
                className="h-5 w-5 cursor-pointer outline-none"
                onClick={() => {
                  if (!isSubscribed)
                    return toast.error("You must subcribe to like this post");
                  toggleLike();
                }}
              />
              <span className="text-xs tabular-nums tracking-tighter text-zinc-400">
                {postState.likes}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger>
                  <MessageCircle className="h-5 w-5 cursor-pointer" />
                </DialogTrigger>
                {isSubscribed && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Comments</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] w-full rounded-md p-4">
                      {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                      ))}
                      {post.comments.length === 0 && (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                          <p className="text-zinc-400">No comments yet</p>
                        </div>
                      )}
                    </ScrollArea>
                    <form
                      className="flex items-center gap-2"
                      onSubmit={handleCommentSubmission}
                    >
                      <Input
                        placeholder="Add a comment"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                      <DialogFooter>
                        <Button
                          type="submit"
                          className=""
                          disabled={isCommenting}
                        >
                          {isCommenting ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <ArrowRight />
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                )}
              </Dialog>
              <span className="text-xs tabular-nums tracking-tighter text-zinc-400">
                {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
