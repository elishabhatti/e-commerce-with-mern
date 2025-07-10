import { Router } from "express";
import {
  loginUser,
  getProfileData,
  logoutUserFromServer,
  registerUser,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  verifyEmailWithCode,
  updateProfilePhoto,
  addToWishList,
} from "../controller/user.controller.js";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/register", registerUser);
router.get("/profile", verifyAuthentication, getProfileData);
router.post("/profile/upload-photo", verifyAuthentication, upload.single("photo"), updateProfilePhoto);
router.post("/verify-email", verifyAuthentication, verifyEmail);
router.post("/verify-email-code", verifyAuthentication, verifyEmailWithCode);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.post("/logout", logoutUserFromServer);
router.post("/add-wishList", verifyAuthentication, addToWishList);
router.put("/update-profile", verifyAuthentication, updateProfile);

export default router;
