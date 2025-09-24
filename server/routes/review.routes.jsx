import { Router } from "express";
import { createReviewProduct } from "../controller/review.controller.js";

const router = Router();

router.post("/review-product", createReviewProduct);

export default router;
