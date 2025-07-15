import { Router } from "express";
import { registerAdmin, getAllUsers, getAllProducts, getAllPurchaseProducts, getAllContacts } from "../controller/admin.controller.js";

const router = Router();

router.post("/register-admin", registerAdmin);
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);
router.get("/purchase", getAllPurchaseProducts);
router.get("/contact", getAllContacts);

export default router;
