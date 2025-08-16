import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";

dotenv.config();

const jobs = [
  {
    title: "Backend Developer",
    description: "Work with Node.js and MongoDB backend APIs.",
    company: "Amazon",
    location: "Hyderabad",
    salary: 1500000,
    experienceLevel: "Mid Level",
  },
  {
    title: "Frontend Developer",
    description: "Develop scalable UI with React and TailwindCSS.",
    company: "Flipkart",
    location: "Bangalore",
    salary: 1200000,
    experienceLevel: "Entry Level",
  },
  {
    title: "Data Scientist",
    description: "Build ML models and analyze large datasets.",
    company: "Google",
    location: "Pune",
    salary: 1800000,
    experienceLevel: "Senior Level",
  },
  {
    title: "Fullstack Developer",
    description: "End-to-end development with MERN stack.",
    company: "Microsoft",
    location: "Delhi NCR",
    salary: 2000000,
    experienceLevel: "Mid Level",
  },
  {
    title: "Next.js Developer",
    description: "Develop SSR apps using Next.js and Vercel.",
    company: "Zomato",
    location: "Chennai",
    salary: 1000000,
    experienceLevel: "Entry Level",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Job.deleteMany({});
    console.log("Old jobs removed");

    await Job.insertMany(jobs);
    console.log("Jobs inserted successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
