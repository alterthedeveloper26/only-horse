import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}

export function checkAdmin(email?: string | null) {
  return email && email === process.env.ADMIN_EMAIL;
}
