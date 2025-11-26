"use client";

import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { products } from "@/dummy_data";
import { FileQuestionMark, X } from "lucide-react";
import React, { useState } from "react";

const ExistingProducts = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <p className="my-3 text-3xl font-medium tracking-tighter">
        Existing Products
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>

      {!isLoading && products?.length === 0 && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-secondary p-6 shadow-md">
          <FileQuestionMark className="h-16 w-16 text-red-600" />
          <p className="mt-4 text-center text-xl font-semibold text-red-600">
            No products found
          </p>
          <p className="mt-2 text-center text-base text-gray-500">
            Please add new products to see them here.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-wrap justify-start gap-10">
          {products.map((prod) => (
            <ProductSkeleton />
          ))}
        </div>
      )}
    </>
  );
};

export default ExistingProducts;
