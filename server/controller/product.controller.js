import { productModel } from "../models/product.models.js";

export const getAllProductsData = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products)
      return res.status(500).json({ message: "Product Not Found Try Later" });
    return res.status(200).json({ message: products });
  } catch (error) {
    console.error("Error From Get Products Controller: ", error);
  }
};

export const productDetails = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
