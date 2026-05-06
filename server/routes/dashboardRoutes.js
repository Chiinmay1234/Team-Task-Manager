const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    res.json({
      totalTasks: 10,
      completedTasks: 5,
      pendingTasks: 3,
      overdueTasks: 2,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;