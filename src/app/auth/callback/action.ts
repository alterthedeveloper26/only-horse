"use server";

import { prisma } from "@/db/prisma";
import { getCurrentUser } from "@/lib/utils";

export async function checkAuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    console.log("[DEBUG] User not found in Kinde");
    return null;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existingUser) return existingUser;

  return await prisma.user.create({
    data: {
      id: user.id,
      email: user.email!,
      name: user.given_name + " " + user.family_name,
      image: user.picture,
    },
  });
}
