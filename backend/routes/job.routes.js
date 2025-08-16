import express from "express";
const router = express.Router();
import Job from "../models/job.model.js";

router.get("/all", async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const jobs = await Job.find({
      title: { $regex: keyword, $options: "i" },
    }).populate("company");
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
