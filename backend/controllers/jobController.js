import Job from "../models/job.model.js";

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      title: { $regex: keyword, $options: "i" },
    }).populate("company", "name logo");
    // sirf name & logo fields return karenge company se

    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error in getAllJobs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
