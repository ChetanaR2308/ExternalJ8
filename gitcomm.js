const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" }
];

const getUserId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

app.get("/", (req, res) => {
  res.json({ message: "User CRUD API is running" });
});
