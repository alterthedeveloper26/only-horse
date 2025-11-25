import React from "react";
import SuggestedProduct from "./SuggestedProduct";
import { products } from "@/dummy_data";

const SuggestedProducts = () => {
  return (
    <div className="sticky right-0 top-0 ml-3 hidden h-screen flex-col gap-3 px-2 lg:flex lg:w-2/5">
      <div className="flex flex-col gap-2 lg:mt-6 xl:mt-6">
        <p className="font-semibold uppercase text-muted-foreground">
          Recommenced products
        </p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <SuggestedProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedProducts;
