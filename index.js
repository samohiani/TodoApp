const mongoose = require("mongoose");
require('dotenv').config();
const express = require("express");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use("/", (req, res) => {
  const message = "Welcome to to your Todo App!";
  res.send(message);
});
app.use("/tasks", tasks);
app.use("/users", users);
app.use("/auth", auth);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
