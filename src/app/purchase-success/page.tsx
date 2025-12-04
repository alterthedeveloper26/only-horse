import React, { Suspense } from "react";
import PurchaseSummary from "./PurchaseSummary";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <PurchaseSummary />
    </Suspense>
  );
};

export default Page;
