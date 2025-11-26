import { v2 as cloudinary } from "cloudinary";

console.log("ENV: ", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!secret) {
    throw new Error("You are missing cloudinary secret!");
  }

  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);

  return Response.json({ signature });
}
