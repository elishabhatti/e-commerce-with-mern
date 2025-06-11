import { Router } from "express";
import {
  addToCart,
  getCartProducts,
  removeCartProduct,
  updateQuantityOfCareItem,
} from "../controller/cart.controller.js";

const router = Router();

router.post("/cart-product", addToCart);
router.get("/get-cart-product", getCartProducts);
router.post("/remove-cart-product/:id", removeCartProduct);
router.post("/update-quantity/:id", updateQuantityOfCareItem);

export default router;
