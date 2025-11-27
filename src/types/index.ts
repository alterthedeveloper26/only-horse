export interface CreatePostDto {
  isPublic: boolean;
  mediaUrl?: string;
  mediaType?: AcceptedMedia;
  text: string;
}

export type AcceptedMedia = "image" | "video";
