import { Router } from "express";
import { addToCart, getCartProducts } from "../controller/cart.controller.js";

const router = Router();

router.post("/cart-product", addToCart);
router.get("/get-cart-product", getCartProducts);

export default router;
