const router = require("express").Router();
const Job = require("../models/Job.model");

// createJob
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      jobRole,
      company,
      location,
      salary,
      website,
      interviewType,
      status,
      favorite,
      createdBy,
    } = req.body;

    const newJob = {
      jobRole,
      company,
      location,
      salary,
      website,
      interviewType,
      status,
      favorite,
      createdBy,
    };

    const response = await Job.create(newJob);

    console.log("new job created");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// JobDetail
router.get("/:jobId", async (req, res) => {
  try {
    const response = await Job.findById(req.params.jobId);

    if (!response) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UpdateJob
router.patch("/:jobId", async (req, res) => {
  try {
    const response = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DeleteJob
router.delete("/:jobId", async (req, res) => {
  try {
    const response = await Job.findByIdAndDelete(req.params.jobId);

    if (!response) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      deletedJob: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
