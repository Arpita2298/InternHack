// controllers/userController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    console.log("📩 Incoming signup data:", req.body);
    const { fullname, email, phoneNumber, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // create new user (password hashing handled in model pre-save hook)
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (role && user.role !== role) {
      return res.status(400).json({ success: false, message: "Role mismatch" });
    }

    // 🔑 JWT generate
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallbackSecret",
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error); // 👈 console pe print karo for debugging
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Cookie clear karna (token null + expire karna)
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};
