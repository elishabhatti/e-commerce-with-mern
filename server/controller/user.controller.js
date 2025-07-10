import passwordResetTokenModel from "../models/password-reset.model.js";
import { userModel } from "../models/user.models.js";
import { sendEmail } from "../lib/sendEmailForgotPassword.js";
import argon2 from "argon2";
import crypto from "crypto";
import {
  createUser,
  hashPassword,
  getUserByEmail,
  comparePassword,
  insertVerifyEmailToken,
  createAccessToken,
  authenticateUser,
  generateRandomToken,
  getVerifyEmailToken,
  deleteVerifyEmailToken,
} from "../services/user.services.js";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";
import mjml2html from "mjml";
import ejs from "ejs";
import { sendVerifyEmail } from "../lib/sendEmailVerifyEmail.js";
import { wishListModel } from "../models/wishlist.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const accessToken = await authenticateUser({ req, res, user });

    res.status(201).json({
      id: user._id,
      email: user.email,
      username: user.name,
      token: accessToken,
      message: "User registered and authenticated successfully",
    });
  } catch (error) {
    console.error("Error from User Register Controller: ", error);
    res.status(500).json({ message: "Server error" });
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
    const accessToken = await authenticateUser({ req, res, user });

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
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refresh_token", {
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

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await passwordResetTokenModel.deleteMany({ userId: user._id });

    await passwordResetTokenModel.create({
      userId: user._id,
      token,
      expiresAt,
    });

    const resetPasswordLink = `http://localhost:5173/reset-password/${token}`;

    const mjmlTemplate = await fs.readFile(
      path.join(__dirname, "..", "emails", "reset-password.mjml"),
      "utf-8"
    );

    const filledTemplate = ejs.render(mjmlTemplate, {
      name: user.name,
      link: resetPasswordLink,
    });

    const htmlOutput = mjml2html(filledTemplate).html;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: htmlOutput,
    });

    return res.json({ success: true, message: "Reset link sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required" });
  }

  try {
    const resetDoc = await passwordResetTokenModel.findOne({ token });
    if (!resetDoc) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (resetDoc.expiresAt < new Date()) {
      await passwordResetTokenModel.deleteOne({ _id: resetDoc._id });
      return res.status(400).json({ error: "Token has expired" });
    }

    const hashedPassword = await argon2.hash(password);
    await userModel.findByIdAndUpdate(resetDoc.userId, {
      password: hashedPassword,
    });

    await passwordResetTokenModel.deleteOne({ _id: resetDoc._id });
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const token = await generateRandomToken();
    const [user] = await userModel.find({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await insertVerifyEmailToken({ userId: user.id, token });
    const verifyEmail = `${token}`;

    const mjmlTemplate = await fs.readFile(
      path.join(__dirname, "..", "emails", "verify-email.mjml"),
      "utf-8"
    );

    const filledTemplate = ejs.render(mjmlTemplate, {
      name: user.name,
      token: verifyEmail,
    });

    const htmlOutput = mjml2html(filledTemplate).html;

    await sendVerifyEmail({
      to: user.email,
      subject: "Verify Email",
      html: htmlOutput,
    });

    res.status(200).json({
      message:
        "Verification email sent successfully Please Check the Mail Box!",
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({
      message: "Failed to send verification email. Please try again.",
    });
  }
};

export const verifyEmailWithCode = async (req, res) => {
  const { code } = req.body;
  const email = req.user.email;

  if (!code) {
    return res.status(400).json({ message: "Verification code is required." });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const storedTokenDoc = await getVerifyEmailToken(user._id);

    if (!storedTokenDoc || storedTokenDoc.token !== code) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code." });
    }

    user.isEmailVerified = true;
    await user.save();
    const deleteToken = await deleteVerifyEmailToken(user._id);
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email code:", error);
    res
      .status(500)
      .json({ message: "Server error during email verification." });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const userId = req.user.id;
    const photoPath = `/uploads/profile-photos/${req.file.filename}`;

    await userModel.findByIdAndUpdate(userId, {
      avatar: photoPath,
    });

    res.status(200).json({ message: "Photo updated", photo: photoPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload profile photo" });
  }
};

export const addToWishList = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    console.log("Product Id", id, "UserId", userId);

    const wishList = await wishListModel.create({ user: userId, product: id });
    console.log(wishList);

    res.status(200).json({ message: wishList });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
};

export const getWishListProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishList = await wishListModel
      .find({ user: userId })
      .populate("product");

    if (!wishList.length) {
      return res.status(404).json({ message: "No products found in wishlist" });
    }

    const products = wishList.map((item) => item.product);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteWishListProducts = async (req, res) => {
  
}