import { Router } from "express";
import { createReviewProduct } from "../controller/review.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/review-product", upload.single("image"), createReviewProduct);

export default router;
