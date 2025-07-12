import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/user.models.js";
import { hashPassword } from "../services/user.services.js";
dotenv.config();

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, address, phone, avatar, adminSecret } =
      req.body;

    if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin secret key." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Admin with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      avatar,
      role: "admin",
    });

    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Admin registered successfully.",
      token,
    });
  } catch (error) {
    console.error("Admin registration error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getAllUsers = async (req, res) => {

};
