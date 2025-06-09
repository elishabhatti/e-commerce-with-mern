import { purchaseModel } from "../models/purchase.model.js";

export const createPurchase = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const newBuy = await purchaseModel.create({
      user: req.user.id,
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

export const getPurchaseProduct = async (req, res) => {
  if (!req.user) return res.status(400).send("Login");

  try {
    const getProduct = await purchaseModel
      .find({ user: req.user.id })
      .populate("product");

    res.status(200).json({
      message: "Products fetched successfully",
      data: getProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};

export const removePurchaseProduct = async (req, res) => {
  if (!req.user) return res.status(400).send("Login");

  try {
    const productId = req.params.id;
    console.log(productId);

    const deleteProduct = await purchaseModel.findByIdAndDelete(productId);
    console.log(deleteProduct);

    if (!deleteProduct)
      return res.status(500).json({ message: "Product not Deleted" });

    res.status(200).json({
      message: "Products Deleted successfully",
      data: deleteProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};
