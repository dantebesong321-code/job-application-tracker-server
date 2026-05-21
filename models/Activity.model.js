const { Schema, model } = require("mongoose");

const activitySchema = new Schema(
  {
    createdBy: { userId },

    status: {
      enum: ["pending", "accepted", "interviewing", "ghosted", "rejected"],
    },
    favorite: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  },
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
