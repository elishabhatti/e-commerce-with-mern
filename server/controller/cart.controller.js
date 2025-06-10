import { cartModel } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const newCart = await cartModel.create({
      user: req.user.id,
      product: productId,
      size,
      quantity,
    });

    res.status(201).json({
      message: "Product purchased successfully",
      data: newCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to buy product", error });
  }
};
