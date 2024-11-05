import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Posts API",
      version: "1.0.0",
      description: "The typical Posts API.",
    },
  },
  components: {
    schemas: {
      Post: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "The auto-generated id of the post",
          },
          title: {
            type: "string",
            description: "The title of the post",
          },
          author: {
            type: "string",
            description: "The author of the post",
          },
          contents: {
            type: "string",
            description: "The contents of the post",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            description: "The tags associated with the post",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the post was created",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the post was last updated",
          },
        },
        required: ["title", "author", "contents"],
      },
    },
  },
  apis: ["./src/routes/posts.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);
export default specs;
