import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentWithUser } from "@/types";
import React from "react";

const Comment = ({ comment }: { comment: CommentWithUser }) => {
  return (
    <div className="flex gap-2 border-b py-2">
      <Avatar>
        <AvatarImage
          src={comment.user.image || "user-placeholder.png"}
          className="object-cover"
        />
        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col">
        <span className="text-sm font-semibold text-muted-foreground">
          {comment.user.name}
        </span>
        <div className="flex items-center justify-start gap-3">
          <span className="text-sm text-muted-foreground">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
          <p className="text-sm leading-tight">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
