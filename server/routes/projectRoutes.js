const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ONLY ADMIN CAN CREATE PROJECT
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProject
);

// BOTH ADMIN & MEMBER CAN VIEW PROJECTS
router.get(
  "/",
  protect,
  authorizeRoles("admin", "member"),
  getProjects
);

module.exports = router;