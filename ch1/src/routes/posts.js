import { listPosts, getPost } from "../services/posts.js";

export function postsRoutes(app) {
  app.get("/api/v1/posts", async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query;

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: "Query by author or tag, not both" });
      }

      if (author) {
        return res.json(await listPosts({ author }, { sortBy, sortOrder }));
      }

      if (tag) {
        return res.json(await listPosts({ tag }, { sortBy, sortOrder }));
      }

      return res.json(await listPosts());
    } catch (err) {
      console.error("Error listing posts", err);
      return res.status(500).end();
    }
  });

  app.get("/api/v1/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const post = await getPost(id);

      if (post === null) {
        return res.json({});
      }

      return res.json(post);
    } catch (err) {
      console.error("Error getting post", err);
      return res.status(500).end();
    }
  });
}
