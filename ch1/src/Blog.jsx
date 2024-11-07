import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPosts } from "./api/posts.js";
import { CreatePost } from "./components/CreatePost";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";
import { PostList } from "./components/PostList";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  const posts = postsQuery.data ?? [];

  return (
    <>
      <div>
        <CreatePost></CreatePost>
      </div>
      <div>
        <PostFilter
          field="author"
          value={author}
          onChange={(value) => setAuthor(value)}
        ></PostFilter>
        <PostSorting
          fields={["createdAt", "updatedAt"]}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(orderValue) => setSortOrder(orderValue)}
        ></PostSorting>
      </div>
      <div>
        <PostList posts={posts}></PostList>
      </div>
    </>
  );
}
