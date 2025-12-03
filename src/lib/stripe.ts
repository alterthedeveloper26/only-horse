import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_DEV_KEY;

if (!secretKey) {
  throw new Error("Stripe secret key is not configured in ENV");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});
