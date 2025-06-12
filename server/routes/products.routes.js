import { Router } from "express";
import {
  getAllProductsData,
  productDetails,
} from "../controller/product.controller.js";

const router = Router();

router.get("/get-product", getAllProductsData);
router.get("/products/:id", productDetails);

export default router;

