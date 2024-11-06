import mongoose from "mongoose";

export function initDatabase() {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) {
    throw new Error("DATABASE_URL not defined");
  }

  mongoose.connection.on("open", () => {
    console.info(`Connected to database: ${database_url}`);
  });

  return mongoose.connect(database_url);
}
