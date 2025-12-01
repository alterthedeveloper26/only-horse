import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import React from "react";
import ProductCheckout from "./ProductCheckout";
import { notFound } from "next/navigation";
import { getLiveProductById, getLiveProducts } from "@/db/product.repository";

const Page = async ({ params }: { params: { id: string } }) => {

  const product = await getLiveProductById(params.id)
  const products = await getLiveProducts()

  if(!product || product.isArchived){
    return notFound()
  }

  return (
    <div className="my-20 px-3 md:px-7">
      <ProductCheckout
        product={product}
      />
      <h1 className="mb-10 mt-20 text-center text-3xl font-bold tracking-tight">
        More product from{" "}
        <UnderlinedText className="decoration-wavy underline-offset-8">
          OnlyHorse
        </UnderlinedText>
      </h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.filter(prod => prod.id !== params.id).map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default Page;
