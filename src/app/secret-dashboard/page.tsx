import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ContentTab from "./content/ContentTab";
import StoreTab from "./store/StoreTab";
import AnalyticsTab from "./analytics/AnalyticsTab";

const Page = () => {
  return (
    <div>
      <Tabs
        defaultValue="content"
        className="mx-auto my-10 w-full px-2 md:px-10"
      >
        <TabsList className="mx-auto flex h-auto w-full flex-col md:w-3/4 md:flex-row">
          <TabsTrigger value="content" className="w-full md:w-auto">
            Content
          </TabsTrigger>
          <TabsTrigger value="store" className="w-full md:w-auto">
            Store
          </TabsTrigger>
          <TabsTrigger value="analytics" className="w-full md:w-auto">
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <ContentTab />
        </TabsContent>
        <TabsContent value="store">
          <StoreTab />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
