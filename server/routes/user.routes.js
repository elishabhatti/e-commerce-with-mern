import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router()

router.get("/register", registerUser)

export default router;