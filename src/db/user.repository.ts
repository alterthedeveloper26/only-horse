import { User } from "@/generated/prisma/client";
import { prisma } from "./prisma";
import { success } from "@/lib/utils";

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUserById = async (id: string, data: Partial<User>) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};
