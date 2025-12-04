import { Order } from "@/generated/prisma/client";
import { prisma } from "./prisma";

export const createOrder = async (data: {
  userId: string;
  productId: string;
  price: number;
  size: string;
}) => {
  return prisma.order.create({
    data,
  });
};

export const updateOrderById = async ({
  id,
  data,
}: {
  id: string;
  data: {
    isPaid: boolean;
    shippingAddress: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      isPaid: data.isPaid,
      shippingAddress: {
        create: data.shippingAddress,
      },
    },
  });
};

export const getOrderWithProdById = async (id: string) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
      shippingAddress: true,
    },
  });
};
