import { Router } from "express";
import {
  createPurchase,
  getPurchaseProduct,
  removePurchaseProduct,
} from "../controller/purchase.controller.js";

const router = Router();

router.post("/purchase-product", createPurchase);
router.get("/get-purchase-product", getPurchaseProduct);
router.post("/remove-purchased-product/:id", removePurchaseProduct);

export default router;
