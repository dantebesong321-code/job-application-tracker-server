const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.

// Auth route
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const jobRoutes = require("./job.routes");
router.use("/job", jobRoutes);

module.exports = router;
