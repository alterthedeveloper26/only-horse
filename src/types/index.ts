import { Prisma } from "@/generated/prisma/client";

export type AcceptedMedia = "image" | "video";

export interface CreatePostDto {
  isPublic: boolean;
  mediaUrl?: string;
  mediaType?: AcceptedMedia;
  text: string;
}

export interface CreateProductDto {
  name: string;
  image: string;
  price: number;
}

export type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: true;
      };
    };
    likesList: true;
  };
}>;

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;
