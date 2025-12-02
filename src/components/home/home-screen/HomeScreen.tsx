import BaseLayout from "@/components/BaseLayout";
import React from "react";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import { getAdminUser } from "@/db/user.repository";
import { getUserProfileAction } from "@/app/update-profile/action";
import { notFound } from "next/navigation";

const HomeScreen = async () => {
  const adminUser = await getAdminUser();
  const curUser = await getUserProfileAction();

  if (!curUser) return notFound();

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={adminUser!} isSubscribed={curUser.data!.isSubscribed} />
    </BaseLayout>
  );
};

export default HomeScreen;
