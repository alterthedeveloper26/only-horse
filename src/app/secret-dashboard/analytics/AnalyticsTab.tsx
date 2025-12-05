import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { centsToDollars } from "@/lib/utils";
import { DollarSign, SubscriptIcon } from "lucide-react";
import React from "react";
import { getDashBoardDataAction } from "../action";
import { Order, Subscription } from "@/generated/prisma/client";

const AnalyticsTab = async () => {
  const data = await getDashBoardDataAction();

  return (
    <>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.revenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data.totalOrder}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <SubscriptIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSub}</div>
          </CardContent>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap gap-5">
        <RecentSubscriptions recentSubscriptions={data.recentSubs} />
        <RecentSales recentSales={data.recentSales} />
      </div>
    </>
  );
};

export default AnalyticsTab;

const RecentSubscriptions = ({
  recentSubscriptions,
}: {
  recentSubscriptions: {
    price: number;
    user: { email: string; name: string; image: string | null };
    planId: string;
  }[];
}) => {
  return (
    <Card className="flex-1">
      <CardHeader className="px-3">
        <CardTitle>Recent subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 px-3">
        {recentSubscriptions.length === 0 && (
          <p className="text-sm text-muted-foreground">No recent subs</p>
        )}
        {recentSubscriptions.map((sub) => (
          <div className="flex items-center gap-2" key={sub.user.email}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage
                src={sub.user.image || "/user-placeholder.png"}
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-xs font-medium leading-none">
                {sub.user.name}
              </p>
              <p className="text-xs font-medium leading-none">
                {sub.user.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +${centsToDollars(sub.price)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const RecentSales = ({
  recentSales,
}: {
  recentSales: {
    price: number;
    orderDate: Date;
    user: { email: string; name: string; image: string | null };
  }[];
}) => {
  return (
    <Card className="flex-1">
      <CardHeader className="px-3">
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 px-3">
        {recentSales.length === 0 && (
          <p className="text-sm text-muted-foreground">No recent sales</p>
        )}
        {recentSales.map((order) => (
          <div className="flex items-center gap-2" key={order.user.email}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage
                src={order.user.image || "/user-placeholder.png"}
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-xs font-medium leading-none">
                {order.user.name}
              </p>
              <p className="text-xs font-medium leading-none">
                {order.user.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +${centsToDollars(order.price)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
