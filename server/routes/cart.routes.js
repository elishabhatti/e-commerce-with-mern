import { Router } from "express";
import {
  addToCart,
  getCartProducts,
  removeCartProduct,
  updateQuantityOfCartItem,
  getCartProductsById,
  updateCartItem,
} from "../controller/cart.controller.js";

const router = Router();

router.post("/cart-product", addToCart);
router.get("/get-cart-product", getCartProducts);
router.get("/get-cart-product/:id", getCartProductsById);
router.post("/remove-cart-product/:id", removeCartProduct);
router.put("/update-quantity/:cartItemId", updateQuantityOfCartItem);
router.post("/update-cart-product", updateCartItem);

export default router;
