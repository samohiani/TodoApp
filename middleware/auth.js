const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided."});

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token" });
  }
};
