const Joi = require("joi");
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
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(Task) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return Schema.validate(Task);
}

exports.taskSchema = taskSchema;
exports.Task = Task;
exports.validate = validateTask;
