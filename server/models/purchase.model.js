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
    shippingStatus: {
      type: String,
      enum: [
        "placed",
        "packed",
        "shipped",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "JazzCash", "EasyPaisa"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const purchaseModel = mongoose.model("Purchase", purchaseSchema);
