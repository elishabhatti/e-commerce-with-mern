import { reviewModel } from "../models/review.model.js";

export const createReviewProduct = async (req, res) => {
  try {
    const { purchaseId, review } = req.body;
    const userId = req.user.id;
    console.log( purchaseId, review, userId)

    if (!purchaseId || !review.trim()) {
      return res
        .status(400)
        .json({ message: "PurchaseId and review are required" });
    }

    // file path agar image upload hui ho
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/review-photos/${req.file.filename}`;
    }

    // Save in DB
    const newReview = await reviewModel.create({
      user: userId,
      product: purchaseId,
      comment:review,
      photo: imagePath,
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};
