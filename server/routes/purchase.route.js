import { Router } from "express";
import { createPurchase } from "../controller/purchase.controller.js";

const router = Router();

router.post("/purchase-product", createPurchase);

export default router;
