import { prisma } from "./prisma";

export const createComment = async ({
  postId,
  text,
  userId,
}: {
  userId: string;
  text: string;
  postId: string;
}) => {
  return prisma.comment.create({
    data: {
      text,
      postId,
      userId,
    },
  });
};
