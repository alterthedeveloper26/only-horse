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
