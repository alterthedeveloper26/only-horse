import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import SuggestedProducts from "./SuggestedProducts";

const BaseLayout = async ({
  children,
  renderRightPanel = true,
}: {
  children: ReactNode;
  renderRightPanel?: boolean;
}) => {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/");
  }

  return (
    <div className="relative mx-auto flex max-w-2xl lg:max-w-7xl">
      <Sidebar />
      <div className="flex w-full flex-col border-r lg:w-3/5">{children}</div>
      {renderRightPanel && <SuggestedProducts />}
    </div>
  );
};

export default BaseLayout;
