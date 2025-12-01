"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { checkAuthStatus } from "./action";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["authCheck"],
    // queryFn: checkAuthStatus,
    queryFn: async () => await checkAuthStatus(),
  });

  useEffect(() => {
    if (!data?.success) {
      router.push("/");
    }
  }, [data]);

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
