import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Company from "../models/company.model.js";

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
});

// ✅ POST create company
router.post("/create", async (req, res) => {
  try {
    const { name, location, description, website, userId } = req.body;

    if (!name || !location || !description || !website || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const company = new Company({
      name,
      location,
      description,
      website,
      userId,
    });

    await company.save();

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating company",
      error: error.message,
    });
  }
});

export default router;
