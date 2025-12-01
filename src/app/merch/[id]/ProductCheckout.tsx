"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ZoomedImage from "@/components/ZoomedImage";
import { Product } from "@/generated/prisma/client";
import { centsToDollars } from "@/lib/utils";
import React, { useState } from "react";

const ProductCheckout = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <ZoomedImage imgSrc={product.image} />
      <div className="w-full">
        <h1 className="text-2xl font-bold md:text-4xl">{product.name}</h1>

        <p className="text-base text-muted-foreground">
          {centsToDollars(product.price)}$
        </p>
        <Label className="mt-5 inline-block">Size</Label>
        <Select onValueChange={setSelectedSize}>
          <SelectTrigger className="w-[180px] focus:ring-0">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="mt-5 rounded-md px-5 py-2 text-white"
          size={"sm"}
          onClick={() => alert("Bought " + selectedSize + "!")}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
};

export default ProductCheckout;
