const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const activitySchema = new Schema(
  {
    status: {
      type: String,
      enum: ["applied", "offered", "accepted", "interviewing", "rejected"],
      require: true,
    },
    favorite: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  },
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
