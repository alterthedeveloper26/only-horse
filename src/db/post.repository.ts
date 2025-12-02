import { AcceptedMedia } from "@/types";
import { prisma } from "./prisma";
import { Post } from "@/generated/prisma/client";

export const countMedia = async (mediaType: AcceptedMedia) => {
  return prisma.post.count({
    where: {
      mediaType,
    },
  });
};

export const updatePostById = async ({
  id,
  updateData,
}: {
  id: string;
  updateData: Partial<Post>;
}) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: updateData,
  });
};

export const getPostWithLikeUserAndComment = async (userId: string) => {
  return prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      likesList: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const isPostExisted = async (id: string) => {
  const num = await prisma.post.count({
    where: {
      id,
    },
  });
  return num > 0;
};
