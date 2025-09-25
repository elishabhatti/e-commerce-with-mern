import { purchaseModel } from "../models/purchase.model.js";
import { reviewModel } from "../models/review.model.js";
import { userModel } from "../models/user.models.js";
import { productModel } from "../models/product.models.js";

export const createReviewProduct = async (req, res) => {
  try {
    const { purchaseId, review } = req.body;
    const userId = req.user.id;
    console.log(purchaseId, review, userId);

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
      comment: review,
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

export const getReviewProduct = async (req, res) => {
  try {
    const reviews = await reviewModel.find();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const populatedReviews = await Promise.all(
      reviews.map(async (review) => {
        const product = await purchaseModel.findById(review.product);
        const user = await userModel.findById(review.user);
        return { ...review.toObject(), product, user };
      })
    );

    return res.status(200).json({ message: populatedReviews });
  } catch (error) {
    console.error("Error From Get Products Controller: ", error);
    res.status(500).json({ message: "Server error", error });
  }
};
