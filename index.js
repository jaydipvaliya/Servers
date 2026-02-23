const express = require("express");
const app = express();

const users = [
  {
    att: 97,
    uid: 108549,
    totalSub: 14,
    bonus: 20,
    name: "jaydip"
  },
  {
    att: 90,
    uid: 108243,
    totalSub: 14,
    bonus: 21,
    name: "dax"
  }
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.use(express.json());

app.post("/user", (req, res) => {
  const newUser = {
    att: req.body.att,
    uid: req.body.uid,
    totalSub: req.body.totalSub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    att: req.body.att,
    uid: req.body.uid,
    totalSub: req.body.totalSub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});

app.patch("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.att) user.att = req.body.att;
  if (req.body.name) user.name = req.body.name;
  if (req.body.totalSub) user.totalSub = req.body.totalSub;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});
  
app.listen(3000, () => {
  console.log("Server started on port 3000");
});