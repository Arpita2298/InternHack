const Internship = require("../models/internship");

// @desc   Get all internships
const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc   Create internship
const createInternship = async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(400).json({ message: "Error creating internship", error });
  }
};

// @desc   Delete internship
const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Internship.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Internship deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting internship", error });
  }
};

module.exports = {
  getAllInternships,
  createInternship,
  deleteInternship,
};
