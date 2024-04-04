const Joi = require("joi");

const validate = (task) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return Schema.validate(task);
};

module.exports = { validate };
