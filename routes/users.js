const express = require("express");
const { createUser, currentUser } = require("../controller/userController");
const router = express.Router();

router.route("/me").get(currentUser); 
router.route("/").post(createUser);

module.exports = router;