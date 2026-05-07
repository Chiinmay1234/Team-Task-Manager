const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ADMIN ONLY → CREATE TASK
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTask
);

// ADMIN + MEMBER → VIEW TASKS
router.get(
  "/",
  protect,
  authorizeRoles("admin", "member"),
  getTasks
);

// ADMIN + MEMBER → UPDATE TASK STATUS
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "member"),
  updateTaskStatus
);

// ADMIN ONLY → DELETE TASK
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTask
);

module.exports = router;