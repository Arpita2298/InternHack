import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  salary: Number,
  position: Number,
  jobType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // ✅ yeh important hai
  },
});
const Job = mongoose.model("Job", jobSchema);
export default Job;
