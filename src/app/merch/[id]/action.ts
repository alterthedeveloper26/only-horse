"use server";

import { createOrder } from "@/db/order.repository";
import { getLiveProductById } from "@/db/product.repository";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/utils";

export async function createCheckoutSessionAction({
  productId,
  size,
}: {
  productId: string;
  size: string;
}) {
  const kindUser = await getCurrentUser();

  if (!kindUser) {
    throw new Error("Not authorized");
  }

  const prod = await getLiveProductById(productId);

  if (!prod) throw new Error("Prod not found!");

  const orderEntity = await createOrder({
    price: prod.price,
    productId: prod.id,
    size,
    userId: kindUser.id,
  });

  const stripeCustomer = await stripe.customers.create({
    email: kindUser.email!,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: prod.name,
            images: [prod.image],
          },
          unit_amount: prod.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: orderEntity.id,
      size,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-success?orderId=${orderEntity.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/merch/${prod.id}`,
    shipping_address_collection: {
      allowed_countries: ["VN"],
    },
    customer: stripeCustomer.id,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
  });

  if (!session.url)
    throw new Error("Internal server error! Fail creating Stripe order!");

  return { url: session.url };
}
