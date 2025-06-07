import { Router } from "express";
import { createBuyProduct } from "../controller/buyproduct.controller";

const router = Router();

router.post("/buy-product", createBuyProduct);

export default router;
