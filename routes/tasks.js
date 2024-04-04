const {
  getAllTasks,
  createTask,
  completeTask,
  completedTasks,
  updateTask,
  deleteTask,
  getTaskById,
  searchTask,
  activeTasks,
} = require("../controller/taskController");
const express = require("express");
const router = express.Router();

router.route("/search").get(searchTask);
router.route("/:taskId/complete").put(completeTask);
router.route("/completed").get(completedTasks);
router.route("/active").get(activeTasks);
router.route("/").post(createTask);
router.route("/put/:id").put(updateTask);
router.route("/delete/:id").delete(deleteTask);
router.route("/getOne/:id").get(getTaskById);
router.route("/").get(getAllTasks);

module.exports = router;
