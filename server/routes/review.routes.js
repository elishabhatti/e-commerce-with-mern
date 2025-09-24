import { Router } from "express";
import { createReviewProduct, getReviewProduct } from "../controller/review.controller.js";
import { upload } from "../middlewares/review.js";

const router = Router();

router.post("/review-product", upload.single("image"), createReviewProduct);
router.get("/get-review-product", getReviewProduct);

export default router;
