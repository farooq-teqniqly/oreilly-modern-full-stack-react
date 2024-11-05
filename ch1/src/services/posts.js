import { Post } from "../db/models/post.js";

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags });
  return await post.save();
}

export async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder });
}
