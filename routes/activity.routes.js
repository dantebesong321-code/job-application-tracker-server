const router = require("express").Router();
const Activity = require("../models/Activity.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// create
router.post("/", verifyToken, async (req, res, next) => {
  console.log(req.body);
  try {
    const newActivity = {
      status: req.body.status,
      favorite: req.body.favorite,
      createdBy: req.payload._id,
    };

    const response = await Activity.create(newActivity);

    console.log("new activity created");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//updateActivity
router.patch("/:activityId", async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const updatedActivity = {
    status: req.body.status,
    favorite: req.body.favorite,
  };
  Activity.findByIdAndUpdate(req.params.activityId, updatedActivity, {
    new: true,
  });
  then((response) => {
    console.log(response);
    res.sendStatus(202);
  }).catch((error) => {
    console.log(error);
  });
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
