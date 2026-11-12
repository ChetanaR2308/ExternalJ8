
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

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const user = {
    id: users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1,
    name: name.trim(),
    email: email.trim()
  };

  users.push(user);
  return res.status(201).json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = getUserId(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!id || !user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

app.put("/users/:id", (req, res) => {
  const id = getUserId(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!id || !user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  user.name = name.trim();
  user.email = email.trim();
  return res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = getUserId(req.params.id);
  const userIndex = users.findIndex((item) => item.id === id);

  if (!id || userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const [deletedUser] = users.splice(userIndex, 1);
  return res.json(deletedUser);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
