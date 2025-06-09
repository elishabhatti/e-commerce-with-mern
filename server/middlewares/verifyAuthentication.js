import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const verifyAuthentication = (req, res, next) => {
  const accessToken = req.cookies.accessToken;  

  if (!accessToken) {
    return res.status(401).json({ message: "Token missing from cookies" });
  }

  jwt.verify(accessToken, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token", err });
    }

    req.user = user;
    next();
  });
};
