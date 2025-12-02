import { prisma } from "./prisma";

export const countLike = async () => {
  return prisma.like.count();
};

export const unlike = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  return prisma.like.deleteMany({
    where: {
      postId,
      userId,
    },
  });
};

export const like = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  return prisma.like.create({
    data: {
      postId,
      userId,
    },
  });
};
