const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE TASK
router.post("/", protect, createTask);

// GET ALL TASKS
router.get("/", protect, getTasks);

// UPDATE TASK STATUS
router.put("/:id", protect, updateTaskStatus);

// DELETE TASK
router.delete("/:id", protect, deleteTask);

module.exports = router;