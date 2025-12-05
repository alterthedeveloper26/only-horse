"use server";

import { prisma } from "@/db/prisma";
import { centsToDollars, checkAdmin, getCurrentUser } from "@/lib/utils";
import { CreatePostDto, CreateProductDto } from "@/types";
import { success } from "@/lib/utils";
import {
  getRecentSales,
  getTotalMerchRevenue,
  getTotalOrder,
} from "@/db/order.repository";
import {
  getRecentSubscriptions,
  getTotalSubscription,
  getTotalSubscriptionRevenue,
} from "@/db/subscription.repository";

export async function getAndValidateAdmin() {
  const user = await getCurrentUser();

  const isAdmin = checkAdmin(user?.email);

  if (!user || !isAdmin) {
    throw new Error("Not authorized!");
  }

  return user;
}

export async function createPostAction({
  isPublic,
  text,
  mediaType,
  mediaUrl,
}: CreatePostDto) {
  const user = await getAndValidateAdmin();

  const newPost = await prisma.post.create({
    data: {
      text,
      mediaType,
      mediaUrl,
      isPublic,
      userId: user.id,
    },
  });

  return success(newPost);
}

// NOTE: Product, merch
export const getAllProductsAction = async () => {
  const products = await prisma.product.findMany();

  return success(products);
};

export const addNewProductsAction = async ({
  image,
  name,
  price,
}: CreateProductDto) => {
  await getAndValidateAdmin();

  const cents = Math.round(price * 100);

  if (isNaN(cents)) {
    throw new Error("Please enter a valid value!");
  }

  const product = await prisma.product.create({
    data: {
      image,
      name,
      price: cents,
    },
  });

  return success(product);
};

export const toggleProductArchiveAction = async (prodId: string) => {
  await getAndValidateAdmin();

  const prod = await prisma.product.findFirst({
    where: {
      id: prodId,
    },
  });

  if (!prod) {
    throw new Error("Prod not found!");
  }

  const updatedProd = await prisma.product.update({
    where: { id: prodId },
    data: {
      isArchived: !prod.isArchived,
    },
  });

  return success(updatedProd);
};

export async function getDashBoardDataAction() {
  const totalRevenuePromise = Promise.all([
    getTotalMerchRevenue(),
    getTotalSubscriptionRevenue(),
  ]);

  const [totalRevenueRes, totalSub, totalOrder, recentSales, recentSubs] =
    await Promise.all([
      totalRevenuePromise,
      getTotalSubscription(),
      getTotalOrder(),
      getRecentSales(),
      getRecentSubscriptions(),
    ]);

  const revenue = totalRevenueRes.reduce((pre, cur) => {
    return pre + cur._sum.price!;
  }, 0);

  return {
    revenue: centsToDollars(revenue),
    totalSub,
    totalOrder,
    recentSales,
    recentSubs,
  };
}
