"use client";

import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CldUploadWidget,
  CldVideoPlayer,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

const AddNewProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [mediaUrl, setMediaUrl] = useState<string>("");

  return (
    <>
      <p className="my-5 text-center text-3xl font-medium tracking-tighter">
        Add <RotatedText>New</RotatedText> Product
      </p>
      <form>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">New Merch</CardTitle>
            <CardDescription>
              Add a new product to your store. Select only one img.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="OnlyHorse Special"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="14.99"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              ></Input>
            </div>

            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result, { widget }) => {
                setMediaUrl(
                  (result.info as CloudinaryUploadWidgetInfo).secure_url,
                );
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    type="button"
                    onClick={() => open()}
                    variant={"outline"}
                    className=""
                  >
                    Upload an image
                  </Button>
                );
              }}
            </CldUploadWidget>

            {mediaUrl && (
              <div className="relative flex h-96 w-full justify-center">
                <Image
                  fill
                  src={mediaUrl}
                  alt="Uploaded img"
                  className="rounded-md object-contain"
                />
              </div>
            )}

            <CardFooter>
              <Button className="w-full" type="submit">
                Add Product
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default AddNewProductForm;
