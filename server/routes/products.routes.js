import { Router } from "express";
import { getAllProductsData } from "../controller/product.controller.js";

const router = Router();

router.get("/get-product", getAllProductsData);

export default router;
