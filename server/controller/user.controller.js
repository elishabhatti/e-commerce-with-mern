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
    console.log(userId);
    
    let profile = await userModel.findById(userId);
    res.status(200).json({ data: profile });
  } catch (error) {
    console.error(error);
  }
};
