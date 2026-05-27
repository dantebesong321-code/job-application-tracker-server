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
      type: String,
      enum: ["virtual", "in-person"],
    },

    status: {
      type: String,
      enum: ["applied", "offered", "accepted", "interviewing", "rejected"],
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

const Job = model("Job", jobSchema);

module.exports = Job;
