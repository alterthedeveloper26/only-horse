import { upsertSubscription } from "@/db/subscription.repository";
import {
  getUserByEmail,
  getUserById,
  updateUserById,
} from "@/db/user.repository";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY;
const monthlyPriceId = process.env.STRIPE_MONTHLY_SUB_ID;
const yearlyPriceId = process.env.STRIPE_YEARLY_SUB_ID;

if (!webHookSecret || !monthlyPriceId || !yearlyPriceId) {
  throw new Error("Configs missing!");
}

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("stripe-signature");

  if (!signature) return new Response("Invalid signature", { status: 500 });

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webHookSecret!);
  } catch (e) {
    console.log("________________: ", e);
    return new Response(`Webhook error ${e}`, { status: 400 });
  }

  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items", "customer_details"],
          },
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details!;
        const lineItems = session.line_items?.data || [];

        if (customerDetails.email) {
          const user = await getUserByEmail(customerDetails.email);

          if (!user) {
            throw new Error("User not found!");
          }

          if (!user.customerId) {
            await updateUserById(user.id, {
              customerId,
            });
          }

          for (const item of lineItems) {
            const planId = item.price?.id!;
            const isSubscription = item.price?.type === "recurring";
            const price = item.amount_total || 0;

            if (isSubscription) {
              let endDate = new Date();
              if (planId === yearlyPriceId) {
                endDate.setFullYear(endDate.getFullYear() + 1);
              } else if (planId === monthlyPriceId) {
                endDate.setMonth(endDate.getMonth() + 1);
              } else {
                throw new Error("Invalid price id!");
              }

              await upsertSubscription(user.id, {
                endDate,
                planId,
                price,
              });

              await updateUserById(user.id, {
                isSubscribed: true,
              });
            } else {
              // TODO: implemented later (buying product)
            }
          }
        }
      }
    }

    return NextResponse.json({});
  } catch (e) {}
}
