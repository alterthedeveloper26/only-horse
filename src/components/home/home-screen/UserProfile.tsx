import React from "react";
import CoverImage from "./CoverImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAdminUser, getUserById } from "@/db/user.repository";
import { getCurrentUser } from "@/lib/utils";

const UserProfile = async () => {
  const adminUser = await getAdminUser();
  const loginSession = await getCurrentUser();
  const currentUser = await getUserById(loginSession!.id);

  return (
    <div className="flex flex-col">
      <CoverImage adminName={adminUser?.name!} />
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Avatar className="-mt-10 h-20 w-20 border-2">
            <AvatarImage
              src={adminUser?.image || "/user-placeholder.png"}
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex">
            {!currentUser?.isSubscribed && (
              <Button asChild className="flex gap-10 rounded-full">
                <Link href={"/pricing"}>
                  <span className="font-semibold uppercase tracking-wide">
                    Subscribe
                  </span>
                </Link>
              </Button>
            )}

            {currentUser?.isSubscribed && (
              <Button className="flex gap-10 rounded-full" variant={"outline"}>
                <span className="font-semibold uppercase tracking-wide">
                  Subscribed
                </span>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-lg font-semibold">{adminUser?.name}</p>
          <p className="mt-2 text-sm md:text-base">
            Discover daily tips and tricks for horse health and care, along with
            insights into my personal routine with my horses. Subscribe now to
            gain access to exclusive content and become part of the community.
          </p>
        </div>
      </div>
      <div className="h-2 w-full bg-muted" aria-hidden="true" />
    </div>
  );
};

export default UserProfile;
