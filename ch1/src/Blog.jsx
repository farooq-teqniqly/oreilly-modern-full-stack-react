import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts.js";
import { CreatePost } from "./components/CreatePost";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";
import { PostList } from "./components/PostList";

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const posts = postsQuery.data ?? [];

  return (
    <>
      <div>
        <CreatePost></CreatePost>
      </div>
      <div>
        <PostFilter field="author"></PostFilter>
        <PostSorting fields={["createdAt", "updatedAt"]}></PostSorting>
      </div>
      <div>
        <PostList posts={posts}></PostList>
      </div>
    </>
  );
}
