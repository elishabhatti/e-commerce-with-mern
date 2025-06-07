import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
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
