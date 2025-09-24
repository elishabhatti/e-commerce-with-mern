import { Router } from "express";

const router = Router();

router.post("/review-product", createReviewProduct);

export default router;
