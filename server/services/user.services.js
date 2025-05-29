import argon2 from "argon2";
import { userModel } from "../models/user.models.js";

export const hashPassword = (password) => {
  return argon2.hash(password);
};

export const createUser = ({ name, email, password, phone, address, avatar}) => {
  return userModel.create({ name, email, password, phone, address, avatar})
}

export const getUserByEmail = ( email) => {
  return userModel.findOne(email)
}

export const comparePassword = async (password, hash) => {
  return await argon2.verify(hash, password);
};
