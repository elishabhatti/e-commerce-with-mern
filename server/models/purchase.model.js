import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true }
);

export const purchaseModel = mongoose.model("Purchase", purchaseSchema);
