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

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export const findSessionById = async (sessionId) => {
  console.log("Looking for session:", sessionId);
  return await sessionModel.findById(sessionId)
};

export const createAccessToken = async ({
  id,
  email,
  name,
  avatar,
  sessionId,
  isEmailValid,
}) => {
  return jwt.sign(
    {
      id,
      email,
      name,
      avatar,
      sessionId,
      isEmailValid,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
    }
  );
};

export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const findByUserId = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJwtToken(refreshToken);
    console.log("decoded token", decodedToken);

    const currentSession = await findSessionById(decodedToken.sessionId);
    console.log("current session", currentSession);
    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid Session");
    }

    const user = await findByUserId(currentSession.userId);
    if (!user) throw new Error("Invalid User");

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isEmailValid: user.isEmailValid,
      sessionId: currentSession.id,
    };

    const newAccessToken = await createAccessToken(userInfo); // ✅ Fix here
    const newRefreshToken = createRefreshToken(currentSession.id);

    return {
      newAccessToken,
      newRefreshToken,
      user,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Refresh token invalid or expired");
  }
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
