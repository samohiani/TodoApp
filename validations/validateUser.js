const Joi = require("joi");

const validate = (user) => {
  const Schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return Schema.validate(user);
};

module.exports = { validate };
