"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { checkAuthStatus } from "./action";
import { useRouter } from "next/navigation";
import { STRIPE_URL_STORED_KEY } from "@/constants";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Page = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["authCheck"],
    // queryFn: checkAuthStatus,
    queryFn: async () => await checkAuthStatus(),
  });

  useEffect(() => {
    if (isLoading) return;

    const stripeUrl = localStorage.getItem(STRIPE_URL_STORED_KEY);
    // NOTE: not try to subscribe
    if (!stripeUrl) {
      router.push("/");
    } else {
      if (!data || (data && data.isSubscribed)) {
        router.push("/");
      }

      window.location.href = stripeUrl + "?prefilled_email=" + data!.email;
      localStorage.removeItem(STRIPE_URL_STORED_KEY);
    }
  }, [data, isLoading]);

  return (
    <div className="mt-20 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="h-10 w-10 animate-spin text-muted-foreground" />
        <h3 className="text-xl font-bold">Redirecting...</h3>
        <p>Please wait</p>
      </div>
    </div>
  );
};

export default Page;
