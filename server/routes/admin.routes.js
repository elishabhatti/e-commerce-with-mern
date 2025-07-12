import { Router } from "express";
import { registerAdmin, getAllUsers, getAllProducts } from "../controller/admin.controller.js";

const router = Router();

router.post("/register-admin", registerAdmin);
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);

export default router;
