const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const _ = require("lodash");
const { User } = require("../models/user");
const { validate } = require("../validations/validateUser")

const createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already registered" });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).json(_.pick(user, ["name", "email"]));
};

const currentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json({ user });
};

module.exports = {
  createUser,
  currentUser,
};
