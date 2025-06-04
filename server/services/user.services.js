import argon2 from "argon2";
import { userModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";

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

export const createAccessToken = async ({
  id,
  email,
  name,
  phone,
  address,
  avatar,
}) => {
  return jwt.sign(
    { id, email, name, phone, address, avatar },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};
