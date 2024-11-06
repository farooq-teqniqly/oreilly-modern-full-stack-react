import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { initDatabase } from "./db/init.js";

try {
  await initDatabase();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
  console.info(`Express server running on http://localhost:${PORT}`);
} catch (err) {
  console.error("Can't connect to database.", err);
}
