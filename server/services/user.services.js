import argon2 from "argon2";
import { userModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/CONSTANTS.js";
import dotenv from "dotenv";
import sessionModel from "../models/session.model.js";
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

export const createSession = async (userId, { ip, userAgent }) => {
  const session = await sessionModel.create({ userId, ip, userAgent });
  return session;
};

export const createAccessToken = async ({ id, email, name, avatar }) => {
  return jwt.sign({ id, email, name, avatar }, process.env.JWT_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const authenticateUser = async ({ req, res, user }) => {
  const session = await createSession(user._id, {
    ip:
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"] || "unknown",
  });

  const accessToken = await createAccessToken({
    id: user._id,
    name: user.name,
    email: user.email,
    isEmailValid: user.isEmailValid || false,
    sessionId: session._id,
  });

  const refreshToken = createRefreshToken(session._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  res.cookie("access_token", accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_EXPIRY, // e.g., 15 * 60 * 1000 (15 min)
  });

  res.cookie("refresh_token", refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY, // e.g., 30 * 24 * 60 * 60 * 1000 (30 days)
  });
};
