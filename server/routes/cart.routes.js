import { Router } from "express";
import { addToCart } from "../controller/cart.controller.js";

const router = Router();

router.post("/cart-product", addToCart);

export default router;
