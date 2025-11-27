"use server";

import { prisma } from "@/db/prisma";
import { checkAdmin, getCurrentUser } from "@/lib/utils";
import { CreatePostDto } from "@/types";

export async function createPostAction({
  isPublic,
  text,
  mediaType,
  mediaUrl,
}: CreatePostDto) {
  const user = await getCurrentUser();

  const isAdmin = checkAdmin(user?.email);

  if (!user || !isAdmin) {
    throw new Error("Not authorized!");
  }

  const newPost = await prisma.post.create({
    data: {
      text,
      mediaType,
      mediaUrl,
      isPublic,
      userId: user.id,
    },
  });

  return { success: true, post: newPost };
}
