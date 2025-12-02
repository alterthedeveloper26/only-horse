import { prisma } from "./prisma";

export const getLiveProducts = async (
  options: {
    limit: number;
  } = { limit: 4 },
) => {
  return prisma.product.findMany({
    where: {
      isArchived: false,
    },
    take: options.limit,
    orderBy: {
      id: "desc",
    },
  });
};

export const getLiveProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id,
      isArchived: false,
    },
  });
};
