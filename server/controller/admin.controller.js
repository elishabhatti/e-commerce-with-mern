import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/user.models.js";
import { authenticateUser, hashPassword } from "../services/user.services.js";
import { productModel } from "../models/product.models.js";
import { purchaseModel } from "../models/purchase.model.js";
import { contactModel } from "../models/contact.model.js";
dotenv.config();

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, address, phone, avatar, adminSecret } =
      req.body;

    if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin secret key." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Admin with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = await userModel.create({
      name,
      email,
      isEmailVerified: true,
      password: hashedPassword,
      address,
      phone,
      avatar,
      role: "admin",
    });

    console.log(newAdmin);

    const accessToken = await authenticateUser({ req, res, user: newAdmin });

    res.status(201).json({
      id: newAdmin._id,
      email: email,
      username: newAdmin.name,
      token: accessToken,
      message: "Admin registered and authenticated successfully",
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(500).json({ message: "Users Not Found" });
    res.status(200).json({ message: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products)
      return res.status(500).json({ message: "Products Not Found" });
    res.status(200).json({ message: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllPurchaseProducts = async (req, res) => {
  try {
    const purchaseProducts = await purchaseModel
      .find()
      .populate(["product", "user"]);
    if (!purchaseProducts)
      return res.status(500).json({ message: "Purchase Products Not Found" });

    res.status(200).json({ message: purchaseProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    if (!contacts)
      return res.status(500).json({ message: "contacts Not Found" });

    res.status(200).json({ message: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const createProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    price,
    brand,
    rating,
    reviews,
    isFeatured,
  } = req.body;
  try {
    const products = await productModel.create({
      image,
      title,
      description,
      price,
      brand,
      rating,
      reviews,
      isFeatured,
    });
    if (!products)
      return res.status(400).json({ message: "Product Not Created" });
    res.status(200).json({ message: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID is required to delete product." });
    }

    await productModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) return res.status(500).json({ message: "Product Not Found" });
    res.status(200).json({ message: product });
  } catch (error) {
    console.error("Error While Getting the Product By ID", error);
    res.status(500).json({ message: error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    price,
    brand,
    rating,
    reviews,
    isFeatured,
  } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        image,
        title,
        description,
        price,
        brand,
        rating,
        reviews,
        isFeatured,
      },
      { new: true, runValidators: true } // returns updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "User Not Found." });
    }

    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Order Not Found." });
    }

    await purchaseModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Order Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Contact Not Found." });
    }

    await contactModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getPurchaseProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await purchaseModel
      .findById(id)
      .populate(["product", "user"]);
    if (!order) return res.status(500).json({ message: "Order Not Found" });
    console.log(order);

    res.status(200).json({ message: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactModel.findById(id).populate("user");

    if (!contact) return res.status(500).json({ message: "Contact Not Found" });
    res.status(200).json({ message: contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getProfileDataAdmin = async (req, res) => {
  try {
    let userId = req.user.id;    
    let profile = await userModel.findById(userId);
    res.status(200).json({ data: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: error });
  }
};
