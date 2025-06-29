import { sendEmail } from "../lib/sendEmailForgotPassword.js";
import crypto from "crypto";
import { userModel } from "../models/user.models.js";
import {
  createUser,
  hashPassword,
  getUserByEmail,
  comparePassword,
  createAccessToken,
} from "../services/user.services.js";

export const registerUser = async (req, res) => {
  const { name, email, password, phone, address, avatar } = req.body;

  if (!name || !email || !password || !phone || !address || !avatar) {
    return res.status(401).json({ message: "All field are required" });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const createdUser = await createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      avatar,
    });

    const accessToken = await createAccessToken({
      id: createdUser._id,
      email,
      name,
      avatar,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(201).json({
      id: createdUser._id,
      email: createdUser.email,
      username: createdUser.name,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error("Error from User Register Controller: ", error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = await createAccessToken({
      id: user._id,
      email,
      name: user.name,
      avatar: user.avatar,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      username: user.name,
      token: accessToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error from loginUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUserFromServer = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getProfileData = async (req, res) => {
  try {
    let userId = req.user.id;
    let profile = await userModel.findById(userId);
    res.status(200).json({ data: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, phone, address, avatar } = req.body;

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          name,
          email,
          phone,
          address,
          avatar,
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${resetLink}">Click here to reset your password</a></p>
      <p>This link will expire in 15 minutes.</p>
    `,
  });

  res.json({ message: "Password reset email sent" });
};
