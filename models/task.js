const mongoose = require("mongoose");
const User = require("./user");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 256,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

exports.taskSchema = taskSchema;
exports.Task = Task;
