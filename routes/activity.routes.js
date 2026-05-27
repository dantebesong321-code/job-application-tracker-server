const router = require("express").Router();
const Activity = require("../models/Activity.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// create
router.post("/", verifyToken, async (req, res) => {
  try {
    const newActivity = {
      status: req.body.status,
      favorite: req.body.favorite,
      activityDate: req.body.activityDate,
      jobId: req.body.jobId,
      createdBy: req.payload._id,
    };

    const response = await Activity.create(newActivity);

    console.log("new activity created");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET activities of logged User
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("fetching activity");

    const createdBy = req.payload._id;

    const response = await Activity.find({ createdBy })
      .populate("createdBy")
      .populate("jobId");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET activity for single job created by the user
router.get("/job/:jobId", verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find({
      jobId: req.params.jobId,
    })
      .populate("createdBy")
      .populate("jobId");

    res.status(200).json(activities);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

//updateActivity
router.patch("/:activityId", async (req, res) => {
  try {
    const updatedActivity = {
      status: req.body.status,
      favorite: req.body.favorite,
    };

    const response = await Activity.findByIdAndUpdate(
      req.params.activityId,
      updatedActivity,
      { new: true },
    );

    res.status(202).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DeleteActivity
router.delete("/:activityId", async (req, res) => {
  try {
    const response = await Activity.findByIdAndDelete(req.params.activityId);

    if (!response) {
      return res.status(404).json({
        message: "activity not found",
      });
    }

    res.status(200).json({
      message: "activity deleted successfully",
      deletedActivity: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
