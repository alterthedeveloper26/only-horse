"use client";

import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Loader, TriangleAlert } from "lucide-react";
import {
  CldUploadWidget,
  CldVideoPlayer,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { createPostAction } from "../action";
import { toast } from "@/lib/toast";

const ContentTab = () => {
  const [text, setText] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    // mutationFn: createPostAction,
    mutationFn: async () =>
      createPostAction({
        isPublic,
        text,
        mediaType,
        mediaUrl,
      }),
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: () => {
      toast.error("Failed to create post!");
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
    // mutate({
    //   isPublic,
    //   text,
    //   mediaType,
    //   mediaUrl,
    // });
  };

  return (
    <>
      <p className="my-5 text-center text-3xl font-bold uppercase">
        <UnderlinedText className="decoration-wavy">Share</UnderlinedText> posts
      </p>
      <form onSubmit={handleFormSubmit}>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle>New Post</CardTitle>
            <CardDescription>
              Share exclusive content to your sims
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Description of content"
                onChange={(e) => setText(e.currentTarget.value)}
              ></Textarea>
            </div>
            {/* NOTE: Choose media type part */}
            <Label htmlFor="mediaType">Media Type</Label>
            <RadioGroup
              defaultValue="video"
              value={mediaType}
              onValueChange={(value: "image" | "video") => {
                setMediaType(value);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image">Image</Label>
              </div>
            </RadioGroup>
            {/* NOTE: upload media part */}
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result, { widget }) => {
                setMediaUrl(
                  (result.info as CloudinaryUploadWidgetInfo).secure_url,
                );
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    type="button"
                    onClick={() => open()}
                    variant={"outline"}
                    className=""
                  >
                    Upload a media
                  </Button>
                );
              }}
            </CldUploadWidget>

            {mediaUrl && mediaType === "image" && (
              <div className="relative flex h-96 w-full justify-center">
                <Image
                  fill
                  src={mediaUrl}
                  alt="Uploaded img"
                  className="rounded-md object-contain"
                />
              </div>
            )}

            {mediaUrl && mediaType === "video" && (
              <div className="mx-auto w-full">
                <CldVideoPlayer
                  width={960}
                  height={540}
                  src={mediaUrl}
                  className="rounded-md"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={isPublic}
                onCheckedChange={(e) => setIsPublic(e as boolean)}
              />

              <Label
                htmlFor="public"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as public
              </Label>

              <Alert variant="default" className="text-yellow-400">
                <TriangleAlert className="h-4 w-4 !text-yellow-400" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Your content will be public distributed!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" /> : "Create Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default ContentTab;
