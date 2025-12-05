import { prisma } from "./prisma";

export const upsertSubscription = async (
  userId: string,
  data: {
    planId: string;
    endDate: Date;
    price: number;
    startDate?: Date;
  },
) => {
  if (!data.startDate) data.startDate = new Date();

  return await prisma.subscription.upsert({
    where: {
      userId,
    },
    update: data,
    create: { ...data, userId },
  });
};

export const getTotalSubscriptionRevenue = async () => {
  return prisma.subscription.aggregate({
    _sum: {
      price: true,
    },
  });
};

export const getTotalSubscription = async () => {
  return prisma.subscription.count();
};

export const getRecentSubscriptions = async () => {
  return prisma.subscription.findMany({
    select: {
      user: {
        select: {
          email: true,
          name: true,
          image: true,
        },
      },
      planId: true,
      price: true,
    },
    orderBy: {
      startDate: "desc",
    },
    take: 4,
  });
};
