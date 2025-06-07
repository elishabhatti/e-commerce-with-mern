import { buyProductModel } from "../models/buyProductModel.js";

export const createBuyProduct = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const newBuy = await buyProductModel.create({
      product: productId,
      size,
      quantity,
    });

    const purchases = await buyProductModel.find().populate("product");
    res.status(201).json({
      message: "Product purchased successfully",
      data: newBuy,
      productData: purchases,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to buy product", error });
  }
};
