import { checkAuthStatus } from "@/app/auth/callback/actions";
import { NextResponse } from "next/server";

// NOTE: Development api, remove when finish
export async function GET() {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV !== "development") {
    throw new Error("For development only!");
  }
  const result = await checkAuthStatus();
  return NextResponse.json(result);
}
