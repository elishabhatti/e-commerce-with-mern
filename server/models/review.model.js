import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

export const purchaseModel = mongoose.model("Review", reviewSchema);
