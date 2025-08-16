const express = require("express");
const router = express.Router();
const {
  getAllInternships,
  createInternship,
  deleteInternship,
} = require("../controllers/internshipController");

// GET all internships
router.get("/", getAllInternships);

// POST create internship
router.post("/", createInternship);

// DELETE internship by ID ✅
router.delete("/:id", deleteInternship);

module.exports = router;
