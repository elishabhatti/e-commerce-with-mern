import mongoose from "mongoose";

const buyProductSchema = new mongoose.Schema(
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

export const buyProductModel = mongoose.model("BuyProduct", buyProductSchema);
