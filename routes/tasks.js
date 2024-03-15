const { Task, validate } = require("../models/task");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({ name: req.body.name });
  task = await task.save();

  res.send(task);
});

router.put("/id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findbyIdandUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!task) return res.status(404).send("The task was not found.");

  res.send(task);
});

router.delete("/id", async (req, res) => {
  const task = await Task.findByIdandDelete(req.params.id);

  if (!task) return res.status(404).send("The task was not found.");

  res.send(task);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send("The task was not found.");

  res.send(task);
});

module.exports = router;
