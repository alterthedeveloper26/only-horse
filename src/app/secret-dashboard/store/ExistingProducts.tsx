"use client";

import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { FileQuestionMark, X } from "lucide-react";
import React, { useState } from "react";
import { getAllProductsAction } from "../action";

const ExistingProducts = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProductsAction,
  });

  const products = data?.products || [];

  return (
    <>
      <p className="my-3 text-3xl font-medium tracking-tighter">
        Existing Products
      </p>

      {isLoading && (
        <div className="flex flex-wrap justify-start gap-10">
          {[...Array(3)].map((prod, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((prod) => (
            <ProductCard product={prod} key={prod.id} />
          ))}
        </div>
      )}

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
    </>
  );
};

export default ExistingProducts;
