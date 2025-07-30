import argon2 from "argon2";
import { userModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/CONSTANTS.js";
import crypto from "crypto";
import dotenv from "dotenv";
import sessionModel from "../models/session.model.js";
import verifyEmailModel from "../models/verify-email.model.js";
import OauthAccountModel from "../models/oauth.model.js";
dotenv.config();

export const hashPassword = (password) => {
  return argon2.hash(password);
};

export const createUser = ({ name, email, password, phone, address }) => {
  return userModel.create({ name, email, password, phone, address });
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
  return await sessionModel.findById(sessionId);
};

export const createAccessToken = async ({
  id,
  email,
  name,
  avatar,
  sessionId,
  isEmailVerified,
}) => {
  return jwt.sign(
    {
      id,
      email,
      name,
      avatar,
      sessionId,
      isEmailVerified,
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
    const currentSession = await findSessionById(decodedToken.sessionId);
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
      isEmailVerified: user.isEmailVerified,
      sessionId: currentSession.id,
    };

    const newAccessToken = await createAccessToken(userInfo);
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
    email: user.email,
    name: user.name,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
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
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });

  return accessToken;
};

export const generateRandomToken = async (digit = 8) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit - 1;

  return crypto
    .randomInt(min, max + 1)
    .toString()
    .padStart(digit, "0");
};

export const insertVerifyEmailToken = async ({ userId, token }) => {
  await verifyEmailModel.deleteMany({ expiresAt: { $lt: new Date() } });
  await verifyEmailModel.deleteMany({ userId });
  return await verifyEmailModel.create({ userId, token });
};

export const getVerifyEmailToken = async (userId) => {
  return await verifyEmailModel.findOne({ userId }).sort({ createdAt: -1 });
};

export const deleteVerifyEmailToken = async (userId) => {
  return await verifyEmailModel.deleteMany({ userId });
};

export const getUserWithOauthId = async ({ email, provider }) => {
  const user = await userModel.findOne({ email });

  if (!user) return null;

  const oauthAccount = await OauthAccountModel.findOne({
    userId: user._id,
    provider,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    providerAccountId: oauthAccount?.providerAccountId || null,
    provider: oauthAccount?.provider || null,
  };
};

export const linkUserWithOauth = async ({
  userId,
  provider,
  providerAccountId,
}) => {
  await OauthAccountModel.create({
    userId,
    provider,
    providerAccountId,
  });
};

export const createUserWithOauth = async ({
  name,
  email,
  provider,
  providerAccountId,
  picture,
}) => {
  const user = await userModel.create({
    name,
    email,
    isEmailVerified: true,
    avatar: picture || null,
  });

  await OauthAccountModel.create({
    userId: user._id,
    provider,
    providerAccountId,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    provider,
    providerAccountId,
    avatar: user.avatar,
  };
};
