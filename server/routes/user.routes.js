import { Router } from "express";
import {
  loginUser,
  getProfileData,
  logoutUserFromServer,
  registerUser,
  updateProfile,
} from "../controller/user.controller.js";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.js";

const router = Router();

router.post("/register", registerUser);
router.get("/profile", verifyAuthentication, getProfileData);
router.post("/login", loginUser);
router.post("/logout", logoutUserFromServer);
router.put("/update-profile", verifyAuthentication, updateProfile);

export default router;
