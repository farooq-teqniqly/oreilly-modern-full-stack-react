import mongoose from "mongoose";

import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";

export function postsRoutes(app) {
  /**
   * @swagger
   * /api/v1/posts:
   *   get:
   *     summary: Retrieve a list of posts
   *     parameters:
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *         description: The field to sort by
   *       - in: query
   *         name: sortOrder
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *         description: The order to sort by (asc or desc)
   *       - in: query
   *         name: author
   *         schema:
   *           type: string
   *         description: Filter posts by author
   *       - in: query
   *         name: tag
   *         schema:
   *           type: string
   *         description: Filter posts by tag
   *     responses:
   *       200:
   *         description: A list of posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *       500:
   *         description: Server error
   */
  app.get("/api/v1/posts", async (req, res) => {
    const { sortBy, sortOrder, author, tags } = req.query;

    try {
      if (author && tags) {
        return res
          .status(400)
          .json({ error: "Query by author or tag, not both" });
      }

      if (author) {
        return res.json(await listPosts({ author }, { sortBy, sortOrder }));
      }

      if (tags) {
        return res.json(await listPosts({ tags }, { sortBy, sortOrder }));
      }

      return res.json(await listPosts());
    } catch (err) {
      console.error("Error listing posts", err);
      return res.status(500).end();
    }
  });

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   get:
   *     summary: Retrieve a single post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The post ID
   *     responses:
   *       200:
   *         description: A single post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       404:
   *         description: Post not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Post not found"
   *       500:
   *         description: Server error
   */
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

  /**
   * @swagger
   * /api/v1/posts:
   *   post:
   *     summary: Create a new post
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       200:
   *         description: The created post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       500:
   *         description: Server error
   */
  app.post("/api/v1/posts", async (req, res) => {
    try {
      const post = await createPost(req.body);
      return res.json(post);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: err.message });
      }

      return res.status(500).end();
    }
  });

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   patch:
   *     summary: Update a post
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The post ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       200:
   *         description: The updated post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       500:
   *         description: Server error
   */
  app.patch("/api/v1/posts/:id", async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body);
      return res.json(post);
    } catch (err) {
      console.error("Error updating post", err);
      return res.status(500).end();
    }
  });

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   delete:
   *     summary: Delete a post
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The post ID
   *     responses:
   *       204:
   *         description: No content
   *       500:
   *         description: Server error
   */
  app.delete("/api/v1/posts/:id", async (req, res) => {
    try {
      await deletePost(req.params.id);
      return res.status(204).end();
    } catch (err) {
      console.error("Error deleting post", err);
      return res.status(500).end();
    }
  });
}
