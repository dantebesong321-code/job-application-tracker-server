const router = require("express").Router();
const Job = require("../models/Job.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// GET Jobs
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("fetching jobs");
    const createdBy = req.payload._id;
    const response = await Job.find({ createdBy });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// POST createJob verifyToken
router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const newJob = {
      jobRole: req.body.jobRole,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      website: req.body.website,
      interviewType: req.body.interviewType,
      status: req.body.status,
      favorite: req.body.favorite,
      createdBy: req.payload._id,
    };

    const response = await Job.create(newJob);

    console.log("new job created");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// GET JobDetail
router.get("/:jobId", verifyToken, async (req, res) => {
  try {
    console.log(req.params);

    const response = await Job.findById(req.payload._id);

    res.status(200).json(response);
  } catch (error) {
    next(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UpdateJob
router.patch("/:jobId", verifyToken, async (req, res) => {
  try {
    const updatedJob = {
      jobRole: req.body.jobRole,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      website: req.body.website,
      interviewType: req.body.interviewType,
      status: req.body.status,
      favorite: req.body.favorite,
      createdBy: req.body.createdBy,
    };
    const response = await Job.findByIdAndUpdate(req.payload._id, updatedJob, {
      new: true,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DeleteJob
router.delete("/:jobId", verifyToken, async (req, res) => {
  try {
    const response = await Job.findByIdAndDelete(req.payload_id);

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
