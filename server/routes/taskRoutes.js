const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ADMIN ONLY
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTask
);

// ALL LOGGED-IN USERS
router.get(
  "/",
  protect,
  getTasks
);

// ALL LOGGED-IN USERS
router.put(
  "/:id",
  protect,
  updateTaskStatus
);

module.exports = router;