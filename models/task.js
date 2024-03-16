const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 256,
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
