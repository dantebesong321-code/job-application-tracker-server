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
    contractType: {
      type: String,
      enum: ["Permanent contract", "Part-time contract"],
    },
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
    note: String,
    favorite: {
      type: Boolean,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
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
