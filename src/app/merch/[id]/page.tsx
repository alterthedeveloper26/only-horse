import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import { products } from "@/dummy_data";
import React from "react";
import ProductCheckout from "./ProductCheckout";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="my-20 px-3 md:px-7">
      <ProductCheckout
        product={products.find((prod) => prod.id === params.id)}
      />
      <h1 className="mb-10 mt-20 text-center text-3xl font-bold tracking-tight">
        More product from{" "}
        <UnderlinedText className="decoration-wavy underline-offset-8">
          OnlyHorse
        </UnderlinedText>
      </h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default Page;
