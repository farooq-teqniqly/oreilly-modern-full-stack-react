import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerConfig.js";

import { postsRoutes } from "./routes/posts.js";

const app = express();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json());
postsRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export { app };
