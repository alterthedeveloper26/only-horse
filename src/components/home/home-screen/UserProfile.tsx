import React from "react";
import CoverImage from "./CoverImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const UserProfile = () => {
  const isSubscribed = false;
  return (
    <div className="flex flex-col">
      <CoverImage />
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Avatar>
            <AvatarImage src="/user-placeholder.png" />
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

          {/* NOTE: https://www.youtube.com/watch?v=mduqkHlJujA&t=5197s continue here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
