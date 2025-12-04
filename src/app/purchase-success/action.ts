"use server";

import { getOrderWithProdById } from "@/db/order.repository";

export const getOrderAction = async (orderId: string) => {
  return getOrderWithProdById(orderId);
};
