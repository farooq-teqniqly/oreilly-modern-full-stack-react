import mongoose, { Schema } from "mongoose";

const validateString = (v) => v.trim().length > 0;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validateString(v),
        message: "`title` is required",
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    contents: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validateString(v),
        message: "`contents` is required",
      },
    },
    tags: {
      type: [String],
      required: false,
      validate: {
        validator: (v) => v.every((tag) => validateString(tag)),
        message: "`tags` is required",
      },
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("post", postSchema);
