"use server";

import { prisma } from "@/db/prisma";
import { checkAdmin, getCurrentUser } from "@/lib/utils";
import { CreatePostDto, CreateProductDto } from "@/types";

export async function getAndValidateAdmin() {
  const user = await getCurrentUser();

  const isAdmin = checkAdmin(user?.email);

  if (!user || !isAdmin) {
    throw new Error("Not authorized!");
  }

  return user;
}

function success<T>(data: T) {
  return {
    success: true,
    data,
  };
}

function fail(message?: string) {
  return {
    success: false,
    message,
  };
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
