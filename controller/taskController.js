const { Task } = require("../models/task");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { validate } = require("../validations/validateTask");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json({ tasks });
};

const searchTask = async (req, res) => {
  const search = req.query.name;
  const tasks = await Task.find({
    name: { $regex: new RegExp(search, "i") },
    user: req.user._id,
  });
  res.json({ tasks });
};

const createTask = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const task = new Task({ name: req.body.name, user: req.user._id });
  await task.save();
  res.json({ task });
};

const completeTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Task.findbyIdandUpdate(
    { _id: taskId, user: req.user._id },
    { completed: true },
    { new: true }
  );
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ task });
};

const completedTasks = async (req, res) => {
  const tasks = await Task.find({ complete: true, user: req.user._id });
  res.json({ tasks });
};

const updateTask = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.findbyIdandUpdate(
    { _id: req.params.id, user: req.user._id },
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!task) return res.status(404).json({ error: "The task was not found." });

  res.json({ task });
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdandDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) return res.status(404).json({ error: "The task was not found." });

  res.json({ task });
};

const getTaskById = async (req, res) => {
  const task = await Task.findById({ _id: req.params.id, user: req.user._id });

  if (!task) return res.status(404).json({ error: "The task was not found." });

  res.json({ task });
};

const activeTasks = async (req, res) => {
  const tasks = await Task.find({ complete: false, user: req.user._id });
  res.json({ tasks });
};

module.exports = {
  getAllTasks: [auth, getAllTasks],
  createTask: [auth, createTask],
  completeTask: [auth, completeTask],
  completedTasks: [auth, completedTasks],
  updateTask: [auth, updateTask],
  deleteTask: [auth, deleteTask],
  getTaskById: [auth, getTaskById],
  searchTask: [auth, searchTask],
  activeTasks: [auth, activeTasks],
};
