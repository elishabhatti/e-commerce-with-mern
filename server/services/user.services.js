import argon2 from "argon2";
import { userModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashPassword = (password) => {
  return argon2.hash(password);
};

export const createUser = ({
  name,
  email,
  password,
  phone,
  address,
  avatar,
}) => {
  return userModel.create({ name, email, password, phone, address, avatar });
};

export const getUserByEmail = (email) => {
  return userModel.findOne({ email });
};

export const comparePassword = async (password, hash) => {
  return await argon2.verify(hash, password);
};

export const createAccessToken = async ({ id, email, name, avatar }) => {
  return jwt.sign({ id, email, name, avatar }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export const authenticateUser = async ({ req, res, user }) => {
  const accessToken = await createAccessToken({
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  return accessToken; 
};
