import { purchaseModel } from "../models/purchase.model.js";

export const createPurchase = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const newBuy = await purchaseModel.create({
      product: productId,
      size,
      quantity,
    });

    res.status(201).json({
      message: "Product purchased successfully",
      data: newBuy,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to buy product", error });
  }
};

export const getPurchaseProduct = (req, res) => {
  try {
    const getProduct = purchaseModel.find();
    res.status(201).json({
      message: "Product purchased successfully",
      data: getProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to buy product", error });
  }
};
