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
