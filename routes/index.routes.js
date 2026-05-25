const router = require("express").Router();

// Auth route
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

// Job route
const jobRoutes = require("./job.routes");
router.use("/job", jobRoutes);

// Activity route
const activityRoutes = require("./activity.routes");
router.use("/activity", activityRoutes);

module.exports = router;
