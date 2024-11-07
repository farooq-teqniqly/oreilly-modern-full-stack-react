import request from "supertest";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { Post } from "../db/models/post.js";
import { app } from "../app.js";

beforeEach(async () => {
  await Post.deleteMany({});
});

afterEach(async () => {
  await Post.deleteMany({});
});

const getPostTemplate = () => {
  const post = {
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    contents: faker.lorem.paragraph(),
    tags: [faker.lorem.word()],
  };

  return post;
};

describe("POST /api/v1/posts", () => {
  test("can create a new post", async () => {
    const post = getPostTemplate();
    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(200);

    const createdPost = res.body;
    expect(createdPost).toEqual(expect.objectContaining(post));
    expect(createdPost._id).toHaveLength(24);
    expect(new Date(createdPost.createdAt)).toEqual(expect.any(Date));
    expect(new Date(createdPost.updatedAt)).toEqual(expect.any(Date));
    expect(createdPost.__v).toEqual(0);
  });

  test("can create a new post without tags", async () => {
    const post = getPostTemplate();
    delete post["tags"];

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(200);

    const createdPost = res.body;
    expect(createdPost.tags).toHaveLength(0);
  });

  test("returns 400 if author is missing", async () => {
    const post = getPostTemplate();
    delete post["author"];

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`author` is required");
  });

  test("returns 400 if author is emoty or whitespace", async () => {
    const post = getPostTemplate();
    post.author = "  ";

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`author` is required");
  });

  test("returns 400 if title is missing", async () => {
    const post = getPostTemplate();
    delete post["title"];

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`title` is required");
  });

  test("returns 400 if title is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.title = "   ";

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`title` is required");
  });

  test("returns 400 if contents is missing", async () => {
    const post = getPostTemplate();
    delete post["contents"];

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`contents` is required");
  });

  test("returns 400 if contents is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.contents = "  ";

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`contents` is required");
  });

  test("returns 400 if tags is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.tags = ["  "];

    const res = await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.error).toContain("`tags` is required");
  });
});
