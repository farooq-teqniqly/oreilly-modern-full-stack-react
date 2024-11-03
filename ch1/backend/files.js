import { writeFileSync, readFileSync } from "node:fs";

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

const jsonWrite = JSON.stringify(users);
const encoding = "utf-8";

writeFileSync("backend/users.json", jsonWrite, encoding);

const jsonRead = readFileSync("backend/users.json", encoding);
const readUsers = JSON.parse(jsonRead);

console.log(readUsers);
