import { Router } from "express";
import { registerAdmin, getAllUsers } from "../controller/admin.controller.js";

const router = Router();

router.post("/register-admin", registerAdmin);
router.get("/users", getAllUsers);

export default router;
