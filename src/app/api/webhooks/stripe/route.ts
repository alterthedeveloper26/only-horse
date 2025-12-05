import { upsertSubscription } from "@/db/subscription.repository";
import {
  getUserByCustomerId,
  getUserByEmail,
  updateUserById,
} from "@/db/user.repository";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { render } from "@react-email/components";
import WelcomeEmail from "@/emails/WelcomeEmail";
import { updateOrderById } from "@/db/order.repository";
import ReceiptEmail from "@/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
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

              const subEntity = await upsertSubscription(user.id, {
                endDate,
                planId,
                price,
              });

              await updateUserById(user.id, {
                isSubscribed: true,
              });

              console.log("What is the email: ", customerDetails.email);
              try {
                const emailHtml = await render(
                  WelcomeEmail({
                    userEmail: customerDetails.email,
                    userName: user.name || "Valued Customer",
                    subscriptionStartDate: subEntity.startDate,
                    subscriptionEndDate: subEntity.endDate,
                  }),
                );

                const emailResult = await resend.emails.send({
                  from: "OnlyMax <onboarding@resend.dev>",
                  to: [customerDetails.email],
                  subject: "Subscription Welcome",
                  html: emailHtml,
                });
                console.log("Email sent successfully:", emailResult);
              } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Don't throw - we don't want to fail the webhook if email fails
              }
            } else {
              const { orderId } = session.metadata as {
                orderId: string;
                size: string;
              };

              const shippingDetails =
                session.collected_information?.shipping_details?.address;

              const updateOrder = await updateOrderById({
                id: orderId,
                data: {
                  isPaid: true,
                  shippingAddress: {
                    address: shippingDetails?.line1 ?? "",
                    city: shippingDetails?.city ?? "",
                    country: shippingDetails?.country ?? "",
                    state: shippingDetails?.state ?? "",
                    postalCode: shippingDetails?.postal_code ?? "",
                  },
                },
              });

              const emailHtml = await render(
                ReceiptEmail({
                  orderDate: updateOrder.orderDate,
                  orderNumber: updateOrder.id,
                  productImage: updateOrder.product.image,
                  productName: updateOrder.product.name,
                  productSize: updateOrder.size,
                  shippingAddress: updateOrder.shippingAddress!,
                  userName: user.name,
                }),
              );

              // NOTE: send a success email
              await resend.emails.send({
                from: "OnlyHorse <onboarding@resend.dev>",
                to: [customerDetails.email],
                subject: "Order confirmation",
                html: emailHtml,
              });
            }
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = await stripe.subscriptions.retrieve(
          (data.object as Stripe.Subscription).id,
        );
        const user = await getUserByCustomerId(sub.customer as string);

        if (!user) {
          throw new Error("User not found! Critical Server Error!");
        }

        await updateUserById(user.id, {
          isSubscribed: false,
        });
      }
    }

    return NextResponse.json({});
  } catch (e) {
    console.log("What is the error?: ", e);
    return NextResponse.json({});
  }
}
