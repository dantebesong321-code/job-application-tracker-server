const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const jobSchema = new Schema(
  {
    jobRole: {
      type: String,
      required: [true, "Job title required!"],
    },
    company: {
      type: String,
      required: [true, "Input caompy name"],
    },
    location: String,
    salary: String,
    website: String,
    interviewType: {
      enum: ["virtual", "in-person"],
    },

    status: {
      enum: [
        "pending",
        "offered",
        "accepted",
        "interviewing",
        "ghosted",
        "rejected",
      ],
    },
    favorite: {
      type: Boolean,
    },
    dateCreated: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  },
);

const Job = model("Job", jobSchema);

module.exports = Job;
