import { Router } from "express";
import {
  addToCart,
  getCartProducts,
  removeCartProduct,
  updateQuantityOfCartItem,
} from "../controller/cart.controller.js";

const router = Router();

router.post("/cart-product", addToCart);
router.get("/get-cart-product", getCartProducts);
router.post("/remove-cart-product/:id", removeCartProduct);
router.post("/update-quantity/:id", updateQuantityOfCartItem);

export default router;
