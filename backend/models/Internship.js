const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      enum: ["Internship", "Hackathon", "Contest"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    isRemote: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
