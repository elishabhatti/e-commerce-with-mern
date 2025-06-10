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

export const getCartProducts = async (req, res) => {
  if (!req.user) return res.status(400).send("Login");

  try {
    const getCartProduct = await cartModel
      .find({ user: req.user.id })
      .populate("product");

    res.status(200).json({
      message: "Products fetched successfully",
      data: getCartProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};

export const removeCartProduct = async (req, res) => {
  if (!req.user) return res.status(400).send("Login");

  try {
    const productId = req.params.id;
    console.log(productId);
    
    const deleteCartProduct = await cartModel.findByIdAndDelete(productId);
    console.log(deleteCartProduct);

    if (!deleteCartProduct)
      return res.status(500).json({ message: "Product not Deleted" });

    res.status(200).json({
      message: "Products Deleted successfully",
      data: deleteCartProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};
