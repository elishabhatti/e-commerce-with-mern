import { Router } from "express";
import {
  createPurchase,
  getPurchaseProduct,
  removePurchaseProduct,
  getPurchaseProductById,
  updatePurchaseItem,
} from "../controller/purchase.controller.js";

const router = Router();

router.post("/purchase-product", createPurchase);
router.get("/get-purchase-product", getPurchaseProduct);
router.get("/get-purchase-product/:id", getPurchaseProductById);
router.post("/remove-purchased-product/:id", removePurchaseProduct);
router.post("/remove-purchased-product/:id", removePurchaseProduct);
router.put("/update-purchase-product/:id", updatePurchaseItem);

export default router;
