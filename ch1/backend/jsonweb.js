import { createServer } from "http";
import { readFileSync } from "node:fs";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const json = readFileSync("backend/users.json", "utf-8");
  res.end(json);
});

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
