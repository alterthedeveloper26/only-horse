import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/db/prisma";
import { products } from "@/dummy_data";
import React from "react";

const Page = async () => {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false
    }
  })

  return (
    <div className="my-10 px-3 md:px-10">
      <h1 className="my-5 text-center text-3xl font-bold tracking-tight">
        Our{" "}
        <UnderlinedText className="decoration-wavy">Products</UnderlinedText>
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
