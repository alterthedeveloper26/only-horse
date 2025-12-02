"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UploadImageButton from "@/components/UploadImageButton";
import { getCurrentUser } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getUserProfileAction, updateUserProfileAction } from "./action";
import { Loader } from "lucide-react";
import { queryClient } from "@/providers/ReactQueryProvider";
import { KEYS } from "@/constants";
import { toast } from "@/lib/toast";

const UpdateProfileForm = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [profileImage, setProfileImage] = useState<string>();

  const { data: getUserRes, isLoading: getUserLoading } = useQuery({
    queryKey: [KEYS.GET_PROFILE],
    queryFn: async () => await getUserProfileAction(),
  });

  const userInfo = getUserRes?.data;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setProfileImage(userInfo.image || "");
    }
  }, [userInfo]);

  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () =>
      updateUserProfileAction({
        name,
        image: mediaUrl,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.GET_PROFILE],
      });
      toast.success("Updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update!");
    },
  });

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserProfile();
  };

  return (
    <div className="my-20 px-2 md:px-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={mediaUrl || profileImage || "/user-placeholder.png"}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <Label>Name</Label>
            <Input
              placeholder="Enter your name"
              value={name || ""}
              className="my-2"
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <Label>Email</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full" type="button">
                  <Input disabled value={email || ""} className="my-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    For security reasons, your email can not be changed. 😔
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UploadImageButton
              className="mb-4 mt-2 w-full"
              imageUploadHandle={setMediaUrl}
            >
              Change Image
            </UploadImageButton>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" /> : "Update"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfileForm;
