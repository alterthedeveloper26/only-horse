import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";
import { centsToDollars, cn } from "@/lib/utils";
import ZoomedImage from "./ZoomedImage";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const ProductCard = ({
  product,
  adminView = false,
}: {
  product: any;
  adminView?: boolean;
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-x-0 px-2 pb-2">
        <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
        <div>
          <DollarSign className="inline h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{centsToDollars(product.price)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-10">
        <ZoomedImage imgSrc={product.image} />
        <div className="mt-auto flex justify-center">
          {adminView && (
            <Button className="w-full" variant={"outline"}>
              {product.isArchived ? "Live" : "Archived"}
            </Button>
          )}

          {!adminView && (
            <Link
              href={`/merch/${product.id}`}
              className={cn(buttonVariants(), "w-full")}
            >
              Buy
            </Link>
          )}
        </div>
      </CardContent>

      <div className="px-2 py-1">
        {adminView && (
          <span
            className={`text-sm font-medium ${product.isArchived ? "text-red-500" : "text-green-500"}`}
          >
            {product.isArchived ? "Archived" : "Live"}
          </span>
        )}

        {!adminView && (
          <span className={`text-sm font-medium text-green-500`}>In Stock</span>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
