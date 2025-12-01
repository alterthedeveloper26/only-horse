"use server";

import { getUserById, updateUserById } from "@/db/user.repository";
import { User } from "@/generated/prisma/client";
import { getCurrentUser, success } from "@/lib/utils";

export async function getUserProfileAction() {
  const user = await getCurrentUser();

  if (!user) return null;

  const savedUser = await getUserById(user.id);

  return success(savedUser);
}

export async function updateUserProfileAction(updateData: Partial<User>) {
  const user = await getCurrentUser();

  if (!user) return null;

  if (!updateData.name) {
    throw new Error("Name can not be null");
  }

  const updatedUser = await updateUserById(user.id, updateData);

  return success(updatedUser);
}
