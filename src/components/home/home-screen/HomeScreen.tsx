import BaseLayout from "@/components/BaseLayout";
import React from "react";
import UserProfile from "./UserProfile";

const HomeScreen = () => {
  return (
    <BaseLayout>
      <UserProfile />
    </BaseLayout>
  );
};

export default HomeScreen;
