import mongoose from "mongoose";

const DATABASE_URL = "mongodb://localhost:27017/blog";

export function initDatabase() {
  mongoose.connection.on("open", () => {
    console.info(`Connected to database: ${DATABASE_URL}`);
  });

  return mongoose.connect(DATABASE_URL);
}
