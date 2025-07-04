import { Router } from "express";
import { registerAdmin } from "../controller/admin.controller.js";

const router = Router();

router.post("/register-admin", registerAdmin);

export default router;
