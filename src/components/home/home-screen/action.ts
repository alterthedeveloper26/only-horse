"use server";

import { createComment } from "@/db/comment.repository";
import { like, unlike } from "@/db/like.repository";
import {
  getPostWithLikeUserAndComment,
  isPostExisted,
  updatePostById,
} from "@/db/post.repository";
import { prisma } from "@/db/prisma";
import { getUserById } from "@/db/user.repository";
import { checkAdmin, getCurrentUser, success } from "@/lib/utils";

export const getPostsAction = async () => {
  const curUser = await getCurrentUser();

  if (!curUser) throw new Error("Unauthorized!");

  const posts = await getPostWithLikeUserAndComment(curUser.id);

  return posts;
};

export const deletePostAction = async (postId: string) => {
  const curUser = await getCurrentUser();

  if (!curUser) throw new Error("Unauthorized!");

  if (!checkAdmin(curUser.email)) {
    throw new Error("Not admin user!");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return success();
};

export const toggleLikeAction = async (postId: string) => {
  const kindeSession = await getCurrentUser();

  if (!kindeSession) throw new Error("Unauthorized!");

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: { likes: true, likesList: { where: { userId: kindeSession.id } } },
  });

  if (!post) {
    throw new Error("Post not found!");
  }

  let likes = post.likes;
  if (post.likesList.length > 0) {
    likes = Math.max(likes - 1, 0);
    await unlike({ postId, userId: kindeSession.id });
  } else {
    likes += 1;
    await like({ postId, userId: kindeSession.id });
  }

  await updatePostById({ id: postId, updateData: { likes } });
};

export const commentAction = async ({
  postId,
  text,
}: {
  postId: string;
  text: string;
}) => {
  const kindeSession = await getCurrentUser();

  if (!kindeSession) throw new Error("Unauthorized!");

  const user = await getUserById(kindeSession.id);

  if (!user || !user.isSubscribed) {
    throw new Error("You can not comment on this post!");
  }

  const isValid = isPostExisted(postId);

  if (!isValid) throw new Error("Post does not exist!");

  return createComment({
    userId: user.id,
    postId,
    text,
  });
};
