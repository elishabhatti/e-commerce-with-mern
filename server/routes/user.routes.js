import { Router } from "express";
import { loginUser, logoutUserFromServer, registerUser } from "../controller/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUserFromServer);

export default router;
