import React from "react";
import CoverImage from "./CoverImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { admin, user } from "@/dummy_data";

const UserProfile = () => {
  const isSubscribed = user.isSubscribed;
  return (
    <div className="flex flex-col">
      <CoverImage />
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Avatar>
            <AvatarImage src={admin.image || "/user-placeholder.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex">
            {!isSubscribed && (
              <Button asChild className="flex gap-10 rounded-full">
                <Link href={"/pricing"}>
                  <span className="font-semibold uppercase tracking-wide">
                    Subscribe
                  </span>
                </Link>
              </Button>
            )}

            {isSubscribed && (
              <Button className="flex gap-10 rounded-full" variant={"outline"}>
                <span className="font-semibold uppercase tracking-wide">
                  Subscribed
                </span>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-lg font-semibold">{admin.name}</p>
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
