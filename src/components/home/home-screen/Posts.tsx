import UnderlinedText from "@/components/decorators/UnderlinedText";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import Post from "./Post";
import { admin, posts, user } from "@/dummy_data";

const Posts = () => {
  const isLoading = false;
  return (
    <div>
      {!isLoading &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            admin={admin}
            isSubscribed={user.isSubscribed}
          />
        ))}
      {isLoading && (
        <div className="mt-10 flex flex-col gap-10 px-3">
          {[...Array(3)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}
      {!isLoading && posts.length === 0 && (
        <div className="mt-10 px-3">
          <div className="mx-auto flex w-full flex-col items-center space-y-3 md:w-3/4">
            <p className="text-xl font-semibold">
              No Posts <UnderlinedText>Yet</UnderlinedText>
            </p>

            <p>
              Stay tuned for more posts from
              <span className="mx-1 text-xl font-semibold text-primary">
                Only horses
              </span>
              You can subscribe to access exclusive content when it's available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
