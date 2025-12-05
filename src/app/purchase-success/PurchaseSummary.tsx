"use client";

import UnderlinedText from "@/components/decorators/UnderlinedText";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ZoomedImage from "@/components/ZoomedImage";
import { KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import { getOrderAction } from "./action";
import { centsToDollars, getSize } from "@/lib/utils";

const PurchaseSummary = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: [KEYS.GET_ORDER, orderId],
    queryFn: async () => {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const order = await getOrderAction(orderId);
      console.log(order);
      return order;
    },
    enabled: !!orderId, // Only run query if orderId exists
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <p className="mb-6 text-center text-base">
          Verifying your payment, please wait...
        </p>
        <span className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-sky-400" />
      </div>
    );
  }

  if (!order) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <ZoomedImage
          imgSrc={order.product.image!}
          className="my-5 h-96 w-96 rounded-md"
        />
        <h1 className="mb-4 text-2xl font-bold">
          Purchase{" "}
          <UnderlinedText className="decoration-wavy">
            Successful!
          </UnderlinedText>
        </h1>

        <p className="mb-6 text-center text-base">
          Your order is being processed and you will receive a confirmation
          email shortly. If you don't receive an email within 24 hours, please
          contact us with your order ID.
        </p>

        <p className="text-muted-foreground">
          Order Id:{" "}
          <span className="font-bold text-foreground text-sky-400">
            {order.id}
          </span>
        </p>

        <Card className="my-5 w-full">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>{order.product.name}</p>
              <p>${centsToDollars(order.product.price!)}</p>
            </div>
            <div className="flex justify-between">
              <p>Size: {getSize(order.size as any)}</p>
              <p>Quantity: 1</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>Address: {order.shippingAddress?.address} </p>
              <p>City: {order.shippingAddress?.city}</p>
              <p>State: {order.shippingAddress?.state}</p>
              <p>Postal Code: {order.shippingAddress?.postalCode}</p>
              <p>Country: {order.shippingAddress?.country}</p>
            </div>
          </CardContent>
        </Card>

        <p className="mb6 text-center text-base text-muted-foreground">
          Thanks for your purchase!
        </p>

        <div className="mt-2 flex justify-center">
          <Link href={"/merch"} className={buttonVariants()}>
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;
