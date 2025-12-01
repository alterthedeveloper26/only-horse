import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";
import { centsToDollars, cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ZoomedImage from "./ZoomedImage";
import { Product } from "@/generated/prisma/client";

const SuggestedProduct = ({ product }: { product: Product }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-2 pb-0">
        <CardTitle className="text-sm font-medium">
          <p className="w-28 overflow-hidden text-ellipsis text-nowrap">
            {product.name}
          </p>
        </CardTitle>
        <div>
          <DollarSign className="inline h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{centsToDollars(product.price)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-2">
        <ZoomedImage imgSrc={product.image} className="h-44 object-cover" />
        <div className="mt-auto flex justify-center">
          <Link
            href={`/merch/${product.id}`}
            className={cn("w-full", buttonVariants({ size: "sm" }))}
          >
            Buy
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedProduct;
