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
      data: getCartProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products", error });
  }
};

export const getCartProductsById = async (req, res) => {
  if (!req.user) return res.status(400).send("Login");

  try {
    const getCartProduct = await cartModel
      .findOne({ _id: req.params.id, user: req.user.id })
      .populate("product");      

    if (!getCartProduct) {
      return res.status(404).json({ message: "Cart product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: getCartProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get product", error });
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

export const updateQuantityOfCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number",
      });
    }

    if (quantity < 1 || quantity > 100) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be between 1 and 100",
      });
    }

    const cartItem = await cartModel
      .findOne({ _id: cartItemId })
      .populate("product");

    if (cartItem?.product?.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${cartItem.product.stock} items available in stock`,
      });
    }

    const updateCartItem = await cartModel
      .findOneAndUpdate(
        { _id: cartItemId, user: userId },
        { quantity },
        { new: true }
      )
      .populate("product");

    if (!updateCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: updateCartItem,
    });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  const userId = req.user?.id;
  const { productId, quantity, size } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "User or Product ID missing" });
  }

  try {
    const cartItem = await cartModel.findOne({ user: userId, product: productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    cartItem.size = size;
    await cartItem.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      data: cartItem,
    });
    
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
