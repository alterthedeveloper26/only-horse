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

export function success<T>(data?: T) {
  return {
    success: true,
    data,
  };
}

export function fail(message?: string) {
  return {
    success: false,
    message,
  };
}

export function formatLikes(num: number): string | number {
  const oneMil = 1_000_000;
  const oneKilo = 1_000;
  if (num >= oneMil) return "+" + (num / oneMil).toFixed(0) + "M";
  if (num >= oneKilo) return "+" + (num / oneKilo).toFixed(0) + "M";

  return num;
}
