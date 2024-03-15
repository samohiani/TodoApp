const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use("/tasks", tasks);
app.use("/users", users);
app.use("/auth", auth);

mongoose
  .connect(
    "mongodb+srv://ohianisammy2005:dasakantimuse1@cluster0.u6pdi1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
