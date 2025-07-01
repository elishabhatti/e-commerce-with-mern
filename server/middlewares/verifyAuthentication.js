import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const verifyAuthentication = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  req.user = null;

  if (!accessToken && !refreshToken) {
    return next();
  }

  if (!accessToken) {
    return res.status(401).json({ message: "Token missing from cookies" });
  }
  if (accessToken) {
    try {
      jwt.verify(accessToken, JWT_SECRET, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired token", err });
        }

        req.user = user;
        next();
      });
    } catch (error) {
      console.error("Access token invalid:", error);
    }
  }
  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(
        refreshToken
      );
      req.user = user;

      const baseConfig = { httpOnly: true, secure: true };

      res.cookie("access_token", newAccessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.error("Refresh token invalid:", error);
    }
  }
  return next()
};
