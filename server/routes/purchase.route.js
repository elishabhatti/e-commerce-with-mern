import { Router } from "express";
import {
  createPurchase,
  getPurchaseProduct,
} from "../controller/purchase.controller.js";

const router = Router();

router.post("/purchase-product", createPurchase);
router.get("/get-purchase-product", getPurchaseProduct);

export default router;
