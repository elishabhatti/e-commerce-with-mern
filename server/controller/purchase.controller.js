import { purchaseModel } from "../models/purchase.model.js";

export const createPurchase = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const newBuy = await purchaseModel.create({
      product: productId,
      size,
      quantity,
    });
    const purchases = await purchaseModel.find().populate("product");

    res.status(201).json({
      message: "Product purchased successfully",
      data: newBuy,
      productData: purchases,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to buy product", error });
  }
};
