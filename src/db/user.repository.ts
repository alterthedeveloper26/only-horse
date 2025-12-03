import { User } from "@/generated/prisma/client";
import { prisma } from "./prisma";

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
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

export const getAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Please make sure ADMIN_EMAIL is configured in your env!");
  }

  return prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });
};
