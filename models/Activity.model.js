const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const activitySchema = new Schema(
  {
    status: {
      type: String,
      enum: ["applied", "offered", "accepted", "interviewing", "rejected"],
      required: true,
    },
    favorite: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    activityDate: {
      type: Date,
      default: Date.now,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  },

  {
    timestamps: true,
  },
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
